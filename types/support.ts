export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | " WAITING_FOR_CUSTOMER" | "RESOLVED" | "CLOSED";
export type TicketCategory = "BILLING" | "TECHNICAL" | "FEATURE_REQUEST" | "BUG_REPORT" | "ACCOUNT" | "OTHER";

export interface TicketMessage {
    id: number;
    ticketId: number;
    senderId: number;
    message: string;
    attachments: string[];
    isInternal: boolean;
    createdAt: string;
    sender: {
        id: number;
        name: string;
        avatar_secure_url: string | null;
    };
}

export type TicketMessages = TicketMessage[];



export interface Ticket {
    id: number;
    organizationId: number;
    createdById: number;
    assignedToId: number | null;
    subject: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    messages: TicketMessages;
    organization: {
        name: string;
        slug: string;
    };
    creator: {
        name: string;
    };
    assignee: {
        name: string;
    } | null;
    _count: {
        messages: number;
    };
}
export type Tickets = Ticket[];