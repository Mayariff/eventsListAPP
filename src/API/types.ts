export type eventType = 'team_building' | 'conference_call' | 'corporate_party' | 'meeting' | 'other'
export type statusEventType = 'in_progress' | 'planned' | 'happened' | 'cancelled'

export type startersType = {
    id: number,
    person?: {
        name: string,
        position: string,
    }
    department?: string
}

export type itemType = {
    id: number,
    type: eventType,
    eventName?: string,
    startDate: string,
    endDate?: string,
    description?: string,
    status?: statusEventType,
    startersList?: Array<startersType>
}