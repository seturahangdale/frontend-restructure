'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Link as LinkIcon, Video, Info, Plus, Trash2 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'

const CATEGORY_COLORS: Record<string, string> = {
    information: 'blue',
    location:    'emerald',
    event:       'amber',
}

const CATEGORY_ICONS: Record<string, string> = {
    information: '📢',
    location:    '📍',
    event:       '🎬',
}

export function SocialManager() {
    const [data, setData]       = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving]   = useState(false)
    const [activeTab, setActiveTab] = useState('information')

    useEffect(() => { fetchSocial() }, [])

    const fetchSocial = async () => {
        try {
            const res = await apiClient.getSocialData()
            setData(res)
        } catch {
            toast.error('Failed to load social data')
        } finally {
            setLoading(false)
        }
    }

    const normalizeYoutubeUrl = (url: string) => {
        if (!url) return ''
        if (url.includes('<iframe')) {
            const m = url.match(/src=["']([^"']+)["']/)
            if (m?.[1]) return m[1]
        }
        if (url.includes('/embed/')) return url
        let id = ''
        if (url.includes('youtu.be/'))  id = url.split('youtu.be/')[1].split(/[?#]/)[0]
        else if (url.includes('v='))    id = url.split('v=')[1].split(/[&#?]/)[0]
        else if (url.includes('/v/'))   id = url.split('/v/')[1].split(/[?#]/)[0]
        else if (url.includes('/shorts/')) id = url.split('/shorts/')[1].split(/[?#]/)[0]
        return id ? `https://www.youtube.com/embed/${id}` : url
    }

    const getCategoryIndex = (id: string) =>
        (data.videoCategories || []).findIndex((c: any) => c.id === id)

    const addVideo = (categoryId: string) => {
        const cats = [...(data.videoCategories || [])]
        const idx = getCategoryIndex(categoryId)
        if (idx === -1) return
        cats[idx] = { ...cats[idx], videos: [...cats[idx].videos, { url: '', title: '' }] }
        setData({ ...data, videoCategories: cats })
    }

    const updateVideo = (categoryId: string, vIdx: number, field: 'url' | 'title', value: string) => {
        const cats = [...(data.videoCategories || [])]
        const idx = getCategoryIndex(categoryId)
        if (idx === -1) return
        const videos = [...cats[idx].videos]
        if (field === 'url') value = normalizeYoutubeUrl(value)
        videos[vIdx] = { ...videos[vIdx], [field]: value }
        cats[idx] = { ...cats[idx], videos }
        setData({ ...data, videoCategories: cats })
    }

    const removeVideo = (categoryId: string, vIdx: number) => {
        const cats = [...(data.videoCategories || [])]
        const idx = getCategoryIndex(categoryId)
        if (idx === -1) return
        const videos = [...cats[idx].videos]
        videos.splice(vIdx, 1)
        cats[idx] = { ...cats[idx], videos }
        setData({ ...data, videoCategories: cats })
    }

    const updateLink = (index: number, newUrl: string) => {
        const updatedLinks = [...data.socialLinks]
        updatedLinks[index].url = newUrl
        setData({ ...data, socialLinks: updatedLinks })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await apiClient.updateSocialData(data)
            toast.success('Saved successfully!')
        } catch {
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    const getIcon = (platform: string) => {
        const icons: Record<string, string> = {
            instagram: '📷', facebook: '📘', youtube: '▶️', linkedin: '💼', twitter: '𝕏'
        }
        return <span className="text-lg">{icons[platform] ?? '🔗'}</span>
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
            <p>Loading...</p>
        </div>
    )

    const categories: any[] = data.videoCategories || []
    const activeCategory = categories.find((c: any) => c.id === activeTab)

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border">
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight leading-none">
                        Social <span className="text-slate-300 dark:text-muted-foreground font-light text-2xl ml-1">& Media</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mt-2 font-medium italic">
                        Manage video categories and social platform links.
                    </p>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-10 py-5 shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center disabled:opacity-50">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Video Categories */}
            <section className="bg-white dark:bg-card rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border overflow-hidden">
                {/* Category Tabs */}
                <div className="flex border-b border-slate-100 dark:border-border">
                    {categories.map((cat: any) => {
                        const color = CATEGORY_COLORS[cat.id] || 'slate'
                        const isActive = activeTab === cat.id
                        return (
                            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-5 px-4 text-sm font-bold transition-all border-b-2 ${
                                    isActive
                                        ? `border-${color}-500 text-${color}-600 dark:text-${color}-400 bg-${color}-50/50 dark:bg-${color}-950/10`
                                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}>
                                <span>{CATEGORY_ICONS[cat.id]}</span>
                                {cat.label}
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    isActive ? `bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400` : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}>{cat.videos.length}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Active Category Content */}
                {activeCategory && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-foreground">
                                    {CATEGORY_ICONS[activeCategory.id]} {activeCategory.label} Videos
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                                    <Info size={11} className="mt-0.5 shrink-0" />
                                    YouTube link paste karo — auto-convert ho jayega embed URL mein.
                                </p>
                            </div>
                            <button onClick={() => addVideo(activeCategory.id)}
                                className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-bold transition-all">
                                <Plus size={15} /> Add Video
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {activeCategory.videos.map((video: any, vIdx: number) => (
                                <div key={vIdx} className="bg-slate-50 dark:bg-muted/30 rounded-2xl p-5 border border-slate-100 dark:border-border space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Video {vIdx + 1}</span>
                                        <button onClick={() => removeVideo(activeCategory.id, vIdx)}
                                            className="text-red-400 hover:text-red-600 transition-colors p-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <input type="text" value={video.title}
                                        onChange={e => updateVideo(activeCategory.id, vIdx, 'title', e.target.value)}
                                        placeholder="Title (optional)"
                                        className="w-full px-4 py-2.5 bg-white dark:bg-background rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 text-slate-800 dark:text-foreground text-sm font-semibold placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 dark:ring-border" />
                                    <input type="text" value={video.url}
                                        onChange={e => updateVideo(activeCategory.id, vIdx, 'url', e.target.value)}
                                        placeholder="YouTube URL paste karo..."
                                        className="w-full px-4 py-2.5 bg-white dark:bg-background rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 text-slate-800 dark:text-foreground text-sm placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 dark:ring-border" />
                                    <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
                                        {video.url
                                            ? <iframe src={video.url} className="w-full h-full" allowFullScreen title={video.title || `Video ${vIdx + 1}`} />
                                            : <div className="w-full h-full flex items-center justify-center"><Video className="w-8 h-8 text-slate-600" /></div>
                                        }
                                    </div>
                                </div>
                            ))}
                            {activeCategory.videos.length === 0 && (
                                <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
                                    <Video className="w-12 h-12 mb-3 opacity-30" />
                                    <p className="text-sm font-semibold">Koi video nahi hai. "Add Video" click karo.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Social Links */}
            <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border">
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/20 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100/50">
                        <LinkIcon size={26} />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Social Platforms</h3>
                        <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">Platform Links</h4>
                    </div>
                </div>
                <div className="space-y-4">
                    {data.socialLinks.map((link: any, index: number) => (
                        <div key={link.platform} className="flex items-center gap-4 p-5 bg-slate-50/50 dark:bg-muted/30 rounded-2xl border border-slate-100 dark:border-border">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                {getIcon(link.platform)}
                            </div>
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest w-20 shrink-0">{link.name}</span>
                            <input type="text" value={link.url}
                                onChange={e => updateLink(index, e.target.value)}
                                placeholder={`${link.name} URL`}
                                className="flex-1 px-4 py-3 bg-white dark:bg-background rounded-xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-700 dark:text-foreground text-sm placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 dark:ring-border" />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
