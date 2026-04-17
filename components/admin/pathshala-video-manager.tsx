'use client'

import { useEffect, useState } from 'react'
import { Trash2, Plus, Youtube, GripVertical, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Video {
    id: string
    url: string
    title: string
}

function getEmbedUrl(url: string): string {
    // Handle youtu.be short links
    const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
    if (short) return `https://www.youtube.com/embed/${short[1]}`
    // Handle watch?v=
    const watch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
    if (watch) return `https://www.youtube.com/embed/${watch[1]}`
    // Already an embed URL
    if (url.includes('/embed/')) return url
    return url
}

function getThumbnail(embedUrl: string): string {
    const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/)
    if (match) return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
    return ''
}

export function PathshalaVideoManager() {
    const [videos, setVideos] = useState<Video[]>([])
    const [newUrl, setNewUrl] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/pathshala-videos')
            .then(r => r.json())
            .then(d => { setVideos(d.videos || []); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const save = async (updated: Video[]) => {
        setSaving(true)
        try {
            const res = await fetch('/api/pathshala-videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videos: updated }),
            })
            if (res.ok) { setMessage('Saved ✓'); setTimeout(() => setMessage(''), 2000) }
            else setMessage('Save failed')
        } catch {
            setMessage('Save failed')
        } finally {
            setSaving(false)
        }
    }

    const addVideo = () => {
        if (!newUrl.trim()) return
        const embed = getEmbedUrl(newUrl.trim())
        const video: Video = { id: Date.now().toString(), url: embed, title: newTitle.trim() }
        const updated = [...videos, video]
        setVideos(updated)
        save(updated)
        setNewUrl('')
        setNewTitle('')
    }

    const remove = (id: string) => {
        const updated = videos.filter(v => v.id !== id)
        setVideos(updated)
        save(updated)
    }

    const updateTitle = (id: string, title: string) => {
        setVideos(prev => prev.map(v => v.id === id ? { ...v, title } : v))
    }

    const saveTitle = () => save(videos)

    if (loading) return <div className="p-8 text-slate-400 text-sm">Loading...</div>

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                                <Youtube size={20} className="text-red-500" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-900">Film Pathshala Videos</CardTitle>
                                <p className="text-slate-400 text-sm mt-0.5">{videos.length} video{videos.length !== 1 ? 's' : ''} added</p>
                            </div>
                        </div>
                        {message && <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{message}</span>}
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">

                    {/* Add new video */}
                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Add New Video</h3>
                        <div className="flex flex-col md:flex-row gap-3">
                            <Input
                                placeholder="YouTube URL (e.g. https://youtu.be/xxx or https://www.youtube.com/watch?v=xxx)"
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addVideo()}
                                className="flex-1 rounded-xl border-slate-200 bg-white"
                            />
                            <Input
                                placeholder="Title (optional)"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addVideo()}
                                className="md:w-56 rounded-xl border-slate-200 bg-white"
                            />
                            <Button onClick={addVideo} disabled={saving || !newUrl.trim()}
                                className="rounded-xl bg-red-500 hover:bg-red-600 text-white gap-2 px-5 shrink-0">
                                <Plus size={16} /> Add Video
                            </Button>
                        </div>
                    </div>

                    {/* Video grid */}
                    {videos.length === 0 ? (
                        <div className="text-center py-16 text-slate-300">
                            <Youtube size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">No videos yet. Add your first YouTube video above.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {videos.map((video, i) => (
                                <div key={video.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative aspect-video bg-slate-100">
                                        {getThumbnail(video.url) ? (
                                            <img src={getThumbnail(video.url)} alt={video.title || `Video ${i+1}`}
                                                className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Youtube size={32} className="text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <a href={video.url.replace('/embed/', '/watch?v=')} target="_blank" rel="noopener noreferrer"
                                                className="bg-white/90 hover:bg-white text-slate-800 rounded-full p-2 transition-colors">
                                                <ExternalLink size={16} />
                                            </a>
                                            <button onClick={() => remove(video.id)}
                                                className="bg-red-500/90 hover:bg-red-500 text-white rounded-full p-2 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            #{i + 1}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <Input
                                            value={video.title}
                                            onChange={e => updateTitle(video.id, e.target.value)}
                                            onBlur={saveTitle}
                                            placeholder="Add title..."
                                            className="text-sm border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-slate-700 font-medium placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {videos.length > 0 && (
                        <div className="flex justify-end">
                            <Button onClick={() => save(videos)} disabled={saving}
                                className="rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-6">
                                {saving ? 'Saving...' : 'Save All'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
