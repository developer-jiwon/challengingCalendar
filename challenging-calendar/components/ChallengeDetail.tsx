'use client'

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { X, Link as LinkIcon, Image, Paperclip } from "lucide-react"

interface ChallengeDetailProps {
  day: number
  title: string
  description: {
    en: string
    ko: string
  }
  onClose: () => void
  onSave: (evidence: string) => void
  savedEvidence?: string
}

interface Attachment {
  type: 'image' | 'link'
  url: string
}

interface Evidence {
  text: string
  attachments: Attachment[]
}

export function ChallengeDetail({ 
  day, 
  title, 
  description, 
  onClose, 
  onSave,
  savedEvidence 
}: ChallengeDetailProps) {
  const MAX_CHARS = 2000

  // Parse saved evidence if it exists
  const parseSavedEvidence = () => {
    if (!savedEvidence) return { text: '', attachments: [] }
    try {
      return JSON.parse(savedEvidence) as Evidence
    } catch {
      return { text: savedEvidence, attachments: [] } // Handle legacy format
    }
  }

  const savedData = parseSavedEvidence()
  const [evidence, setEvidence] = useState(savedData.text)
  const [attachments, setAttachments] = useState<Attachment[]>(savedData.attachments)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [linkInput, setLinkInput] = useState('')

  const handleSave = () => {
    const evidenceData: Evidence = {
      text: evidence,
      attachments: attachments
    }
    onSave(JSON.stringify(evidenceData))
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Convert image to base64 or upload to storage service
      const reader = new FileReader()
      reader.onloadend = () => {
        setAttachments(prev => [...prev, {
          type: 'image',
          url: reader.result as string
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddLink = () => {
    // Create a more sophisticated link input UI
    const url = prompt('Enter URL:')
    if (url) {
      // Add http:// if not present
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`
      setAttachments(prev => [...prev, {
        type: 'link',
        url: formattedUrl
      }])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleEvidenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setEvidence(text)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        {/* Header Section */}
        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="font-noto text-xl text-burgundy-700">Day {day}: {title}</h2>
            <p className="text-grey-600 text-sm mt-1">Your challenge for today</p>
          </div>

          {/* Challenge Description */}
          <div className="mt-6 text-center">
            <p className="text-lg text-grey-700 mb-2">{description.en}</p>
            <p className="text-grey-600 text-sm">{description.ko}</p>
          </div>
        </div>

        {/* Evidence Section */}
        <div className="px-6">
          <textarea
            value={evidence}
            onChange={handleEvidenceChange}
            maxLength={MAX_CHARS}
            className={cn(
              "w-full min-h-[120px] p-4",
              "border border-dashed border-grey-200 rounded-lg",
              "text-grey-600 resize-none",
              "focus:outline-none focus:border-burgundy-300",
              "placeholder:text-grey-400"
            )}
            placeholder="Write your evidence..."
          />
          <div className="text-right mt-1">
            <span className="text-xs text-grey-400">
              {evidence.length}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="px-6 mt-4 pb-6">
          <div className="flex flex-wrap gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-grey-50 hover:bg-grey-100 rounded-lg transition-colors"
            >
              <Image className="w-4 h-4" />
              Add Image
            </button>
            <button
              onClick={() => setIsAddingLink(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-grey-50 hover:bg-grey-100 rounded-lg transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              Add Link
            </button>
          </div>

          {/* Link Input UI */}
          {isAddingLink && (
            <div className="mt-2 flex gap-2">
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className={cn(
                  "flex-1 px-3 py-1.5 text-base",
                  "rounded-lg bg-grey-50 border border-grey-200",
                  "focus:outline-none focus:ring-2 focus:ring-burgundy-300",
                  "[appearance:none]",
                  "font-size-16"
                )}
                autoFocus
                style={{ fontSize: '16px' }}
              />
              <button
                onClick={() => {
                  if (linkInput) {
                    const formattedUrl = linkInput.startsWith('http') ? linkInput : `https://${linkInput}`
                    setAttachments(prev => [...prev, { type: 'link', url: formattedUrl }])
                    setLinkInput('')
                    setIsAddingLink(false)
                  }
                }}
                className="px-3 py-1.5 text-sm font-medium text-white bg-burgundy-600 rounded-lg hover:bg-burgundy-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setLinkInput('')
                  setIsAddingLink(false)
                }}
                className="px-3 py-1.5 text-sm font-medium text-grey-600 hover:text-grey-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Attachment Preview - Updated with clickable links */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="group relative bg-grey-50 rounded-lg p-2 flex items-center gap-2"
                >
                  {attachment.type === 'image' ? (
                    <img 
                      src={attachment.url} 
                      alt="" 
                      className="w-8 h-8 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => window.open(attachment.url, '_blank')}
                    />
                  ) : (
                    <a 
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-burgundy-600 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-grey-500" />
                      <span className="text-xs text-grey-600 max-w-[120px] truncate hover:text-burgundy-600">
                        {attachment.url.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  )}
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-grey-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-grey-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Centered Buttons - Swapped positions */}
        <div className="p-4 border-t border-grey-100">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="min-w-[100px] px-6 py-2 text-white bg-burgundy-600 font-medium hover:bg-burgundy-700 rounded-lg transition-colors"
            >
              SAVE
            </button>
            <button
              onClick={onClose}
              className="min-w-[100px] px-6 py-2 text-grey-500 font-medium hover:bg-grey-50 rounded-lg transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 