import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './PhotoGallery.css'
import { galleryConfig } from '../../data/galleryConfig'

function PhotoGallery() {
  const photos = Array.isArray(galleryConfig.photos)
    ? galleryConfig.photos.filter((photo) => photo?.src)
    : []

  const sectionRef = useRef(null)
  const touchStartX = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerHost, setViewerHost] = useState(null)

  const activePhoto = photos[activeIndex]

  const nextPhoto = () => {
    if (photos.length > 1) {
      setActiveIndex((current) => (current + 1) % photos.length)
    }
  }

  const previousPhoto = () => {
    if (photos.length > 1) {
      setActiveIndex((current) => (current - 1 + photos.length) % photos.length)
    }
  }

  const openViewer = () => {
    // Portal into the phone viewport so the viewer is not clipped by gallery,
    // scroll-container, or transformed ancestors.
    const phoneScreen = sectionRef.current?.closest('.phone-screen')
    setViewerHost(phoneScreen || document.body)
    setIsViewerOpen(true)
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setViewerHost(null)
    touchStartX.current = null
  }

  // Rotate the featured image every 3 seconds; pause while viewing full-screen.
  useEffect(() => {
    if (photos.length <= 1 || isViewerOpen) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [photos.length, isViewerOpen])

  // Keyboard controls.
  useEffect(() => {
    if (!isViewerOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowRight') nextPhoto()
      if (event.key === 'ArrowLeft') previousPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isViewerOpen, photos.length])

  // Stop the underlying phone page from scrolling while the viewer is open.
  useEffect(() => {
    if (!isViewerOpen || !viewerHost || viewerHost === document.body) return undefined

    const previousOverflow = viewerHost.style.overflow
    viewerHost.style.overflow = 'hidden'

    return () => {
      viewerHost.style.overflow = previousOverflow
    }
  }, [isViewerOpen, viewerHost])

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const distance = endX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(distance) < 45) return
    if (distance < 0) nextPhoto()
    else previousPhoto()
  }

  if (!photos.length) {
    return (
      <section className="photo-gallery" aria-label="Wedding photo gallery">
        <div className="photo-gallery__empty">
          Add photos to galleryConfig.js
        </div>
      </section>
    )
  }

  const viewer = isViewerOpen && activePhoto ? (
    <div
      className="photo-gallery__viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen wedding gallery"
      onClick={closeViewer}
    >
      <div
        className="photo-gallery__viewer-shell"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="photo-gallery__viewer-top">
          <span className="photo-gallery__viewer-counter">
            {String(activeIndex + 1).padStart(2, '0')}
            <span> / </span>
            {String(photos.length).padStart(2, '0')}
          </span>

          <button
            className="photo-gallery__viewer-close"
            onClick={closeViewer}
            type="button"
            aria-label="Close gallery"
          >
            ×
          </button>
        </div>

        <div
          className="photo-gallery__viewer-image"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={activePhoto.src}
            src={activePhoto.src}
            alt={activePhoto.alt || activePhoto.caption || 'Wedding photograph'}
            draggable="false"
          />
        </div>

        {photos.length > 1 && (
          <div className="photo-gallery__viewer-controls">
            <button type="button" onClick={previousPhoto} aria-label="Previous photo">
              ‹
            </button>
            <button type="button" onClick={nextPhoto} aria-label="Next photo">
              ›
            </button>
          </div>
        )}

        <div className="photo-gallery__viewer-caption">
          <p>{activePhoto.caption || 'A moment to treasure'}</p>
          {activePhoto.date && <span>{activePhoto.date}</span>}
        </div>

        <div className="photo-gallery__viewer-dots">
          {photos.map((photo, index) => (
            <button
              key={`${photo.id || photo.src}-${index}`}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null

  return (
    <section
      ref={sectionRef}
      className="photo-gallery"
      aria-label="Wedding photo gallery"
    >
      <div className="photo-gallery__inner">
        <header className="photo-gallery__header">
          <span className="photo-gallery__eyebrow">
            {galleryConfig.eyebrow || 'OUR MEMORIES'}
          </span>
          <h2 className="photo-gallery__title">
            {galleryConfig.title || 'Our Story'}
          </h2>
          <p className="photo-gallery__intro">
            {galleryConfig.description ||
              'A collection of moments that mean everything.'}
          </p>
        </header>

        <div className="photo-gallery__stage">
          <button
            className="photo-gallery__featured"
            type="button"
            onClick={openViewer}
            aria-label="Open photo gallery full screen"
          >
            {photos.map((photo, index) => (
              <div
                className={`photo-gallery__slide ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                key={`${photo.id || photo.src}-${index}`}
                aria-hidden={index !== activeIndex}
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.caption || 'Wedding photograph'}
                  loading={index === activeIndex ? 'eager' : 'lazy'}
                />
                <div className="photo-gallery__image-overlay" />
              </div>
            ))}

            <div className="photo-gallery__featured-label">
              <span className="photo-gallery__label-line" />
              <span>OUR MOMENTS</span>
              <span className="photo-gallery__label-line" />
            </div>

            <div className="photo-gallery__expand">
              <span>VIEW OUR MEMORIES</span>
              <span className="photo-gallery__expand-icon">↗</span>
            </div>
          </button>

          <div className="photo-gallery__caption-area">
            <p className="photo-gallery__caption">
              {activePhoto?.caption || 'A moment to treasure'}
            </p>
            {activePhoto?.date && (
              <span className="photo-gallery__date">{activePhoto.date}</span>
            )}
          </div>

          <div className="photo-gallery__pagination" aria-label="Choose featured photo">
            {photos.map((photo, index) => (
              <button
                key={`${photo.id || photo.src}-${index}`}
                className={`photo-gallery__dot ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === activeIndex}
                type="button"
              />
            ))}
          </div>
        </div>

        <footer className="photo-gallery__footer">
          <span>A LITTLE COLLECTION OF FOREVER</span>
          <i>✦</i>
        </footer>
      </div>

      {viewer && viewerHost && createPortal(viewer, viewerHost)}
    </section>
  )
}

export default PhotoGallery
