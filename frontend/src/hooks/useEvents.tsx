import { useState, useCallback } from 'react'
import type { Event } from '../types/event'

const API = 'http://localhost:8080'

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('auth_token')

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/events?token=${token}`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) setEvents(data.events)
    } catch {
      console.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }, [token])

  const createEvent = async (payload: {
    title: string
    meeting_type: string
    event_date: string
    event_time: string
    notes: string
    guest_email: string
  }) => {
    const res = await fetch(`${API}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...payload, token })
    })
    const data = await res.json()
    if (data.success) {
      setEvents(prev => [...prev, data.event])
      return data.event
    }
    throw new Error(data.error)
  }

  const deleteEvent = async (id: number) => {
    const res = await fetch(`${API}/events/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token })
    })
    const data = await res.json()
    if (data.success) {
      setEvents(prev => prev.filter(e => e.id !== id))
    }
  }

  return { events, loading, fetchEvents, createEvent, deleteEvent }
}