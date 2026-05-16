export interface Event {
  id: number
  user_id: number
  title: string
  meeting_type: 'group' | '1-on-1'
  event_date: string
  event_time: string
  notes: string | null
  guest_email: string | null
  share_token: string
  created_at: string
}