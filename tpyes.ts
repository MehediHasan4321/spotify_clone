import { StaticImageData } from 'next/image'
import Stripe from 'stripe'


export interface UserDetails {
    id:string,
    first_nane:string
    last_name:string
    full_name?:string
    avater_url:string
    billing_address?:string
    paymet_method?:Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface Products{
    id:string
    active?:boolean
    name?:string
    description?:string;
    image?:string
    metadata?:Stripe.Metadata
}

export interface Price{
    id:string
    product_id:string
    active?:boolean
    description?:string
    unit_amount?:string
    currency?:string
    type?:string
    interval?:string
    intervar_count?:number
    trial_priod_days?:number | null
    metadata?:Stripe.Metadata
    products:Products
}


export interface Subscription {
    id:string
    user_id:string
    status?:Stripe.Subscription.Status
    matadata?:Stripe.Metadata
    price_id:string
    quantity:number
    canel_at_period_end?:boolean
    created:string
    current_period_start:string
    ended_at?:string
    cancel_at?:string
    canceled_at?:string
    trial_start?:string
    trial_end?:string
    price?:number

}