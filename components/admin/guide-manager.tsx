'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Eye, Download, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react'

interface Guide {
    id: number
    title: string
    buttonLabel: string
    type: string
    serviceKey: string
    filename: string
    filepath: string
    filesize: number
    uploadedAt: string
}

const SERVICE_LABELS: Record<string, string> = {
    'film-shooting':         'Film Shooting Guide',
    'movie-promotion':       'Movie Promotion Guide',
    'celebrity-management':  'Celebrity Management Guide',
    'theatre-advertisement': 'Theatre Advertisement Guide',
    'subsidy':               'Subsidy Related Guide',
}

export function GuideManager() {
    const [guides, setGuides] = useState<Guide[]>([])
    const [loading, setLoading] = useState(true)
    const [uploadingId, setUploadingId] = useState<number | null>(null)
    const [successId, setSuccessId] = useState<number | null>(null)
    const [errorId, setErrorId] = useState<number | null>(null)
    const [errorMsg, setErrorMsg] = useState('')

    const fetchGuides = async () => {
        try {
            const res = await fetch('/api/documents?type=guide', { cache: 'no-store' })
            const data = await res.json()
            // Only show guides that have a serviceKey (the fixed service guides)
            setGuides(data.documents.filter((d: Guide) => d.serviceKey))
        } catch {
            console.error('Failed to fetch guides')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchGuides() }, [])

    const handleFileChange = async (guide: Guide, file: File) => {
        if (!file) return
        console.log('[GuideManager] file type:', file.type, 'name:', file.name, 'size:', file.size)
        const isPDF = file.type === 'application/pdf'
            || file.type === 'application/x-pdf'
            || file.type === ''
            || file.name.toLowerCase().endsWith('.pdf')
        if (!isPDF) {
            setErrorId(guide.id)
            setErrorMsg(`PDF file chahiye — "${file.name}" PDF nahi hai`)
            setTimeout(() => setErrorId(null), 6000)
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            setErrorId(guide.id)
            setErrorMsg('File too large (max 10MB)')
            setTimeout(() => setErrorId(null), 4000)
            return
        }

        setUploadingId(guide.id)
        setErrorId(null)
        setSuccessId(null)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('id', String(guide.id))

            const res = await fetch('/api/documents/replace', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || 'Upload failed')
            }

            setSuccessId(guide.id)
            setTimeout(() => setSuccessId(null), 3000)
            await fetchGuides()
        } catch (err: any) {
            const msg = err.message || 'Upload failed'
            console.error('[GuideManager] upload error:', msg)
            setErrorId(guide.id)
            setErrorMsg(msg)
        } finally {
            setUploadingId(null)
        }
    }

    const hasFile = (guide: Guide) => !!guide.filepath

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500">
                    Upload PDFs for each guide. These appear as download buttons on the Services page.
                </p>
                <button onClick={fetchGuides} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                </button>
            </div>

            {guides.map((guide, i) => (
                <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                    {/* Status dot + title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${hasFile(guide) ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                        <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-sm truncate">
                                {SERVICE_LABELS[guide.serviceKey] ?? guide.title}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                {hasFile(guide)
                                    ? `Uploaded · ${(guide.filesize / 1024).toFixed(0)} KB · ${new Date(guide.uploadedAt).toLocaleDateString('en-IN')}`
                                    : 'No PDF uploaded yet'}
                            </p>
                        </div>
                    </div>

                    {/* Error message */}
                    {errorId === guide.id && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errorMsg}
                        </p>
                    )}

                    {/* Success */}
                    {successId === guide.id && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Uploaded successfully
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* View / Download (only if file exists) */}
                        {hasFile(guide) && (
                            <>
                                <a
                                    href={guide.filepath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-slate-600 border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-800 transition-all"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    View
                                </a>
                                <a
                                    href={guide.filepath}
                                    download
                                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-slate-600 border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-800 transition-all"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Download
                                </a>
                            </>
                        )}

                        {/* Upload / Replace — input wrapped inside label, most reliable approach */}
                        <label
                            style={{ cursor: uploadingId === guide.id ? 'not-allowed' : 'pointer' }}
                            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold rounded-lg text-white transition-all select-none
                                ${uploadingId === guide.id
                                    ? 'bg-amber-400 opacity-60 pointer-events-none'
                                    : 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                                }`}
                        >
                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                style={{ display: 'none' }}
                                disabled={uploadingId === guide.id}
                                onChange={e => {
                                    console.log('[GuideManager] file selected', e.target.files)
                                    const f = e.target.files?.[0]
                                    if (f) handleFileChange(guide, f)
                                    e.target.value = ''
                                }}
                            />
                            {uploadingId === guide.id ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-3.5 h-3.5" />
                                    {hasFile(guide) ? 'Replace PDF' : 'Upload PDF'}
                                </>
                            )}
                        </label>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
