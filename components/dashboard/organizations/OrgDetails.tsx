/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@radix-ui/react-separator";
import { Box, Calendar, Clock, CreditCard, Globe, Mail, MapPin, Package, Phone, ShieldAlert, User, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationData } from "@/types/organizations";
import { Activity } from "react";
import { Badge } from "@/components/ui/badge";
export default function OrgDetails({ data }: { data: OrganizationData }) {
    return (
        <div className="min-h-screen  rounded-2xl p-4 ">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* --- HERO SECTION --- */}
                <div className="relative overflow-hidden rounded-3xl effect p-8 text-white shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                                {data.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
                                    <Badge className={data.isActive ? "bg-emerald-500" : "bg-gray-500"}>
                                        {data.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <p className="text-slate-100 flex items-center gap-2 mt-1">
                                    <Globe size={14} /> {data.website}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 text-right">
                            <span className="text-xs uppercase tracking-widest text-green-600 font-semibold">Active Plan</span>
                            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                <p className="text-xl font-bold text-indigo-300 uppercase tracking-tighter">{data.plan.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ALERT BAR (IF SUSPENDED) --- */}
                {data.isSuspended && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 animate-pulse">
                        <ShieldAlert className="shrink-0" />
                        <div className="text-sm">
                            <span className="font-bold">Account Suspended:</span> {data.suspendedReason} —
                            <span className="opacity-80 ml-1 italic">{new Date(data.suspendedAt ? data.suspendedAt : "").toDateString()}</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN: CORE SPECS --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Users", val: data.maxUsers, icon: Users, color: "text-blue-600" },
                                { label: "Customers", val: data.maxCustomers, icon: Activity, color: "text-emerald-600" },
                                { label: "Products", val: data.maxProducts, icon: Box, color: "text-orange-600" },
                                { label: "Locations", val: data.maxLocations, icon: MapPin, color: "text-purple-600" },
                            ].map((stat, i) => {
                                // Icon ke capitalized variable e nite hobe
                                const IconComponent = stat.icon;

                                return (
                                    <Card key={i} className="p-4  effect hover:shadow-md transition-shadow">
                                        {/* Ekhon IconComponent render korle error thakbe na */}
                                        {/* <IconComponent className={`${stat.color} mb-2`} size={20} /> */}
                                        <p className="text-2xl font-bold tabular-nums">{stat.val}</p>
                                        <p className="text-xs text-slate-100 font-medium uppercase tracking-wider">{stat.label}</p>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Detailed Info Card */}
                        <Card className="overflow-hidden border-none effect">
                            <div className=" p-6 md:p-8">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                                    Contact Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8 text-sm">
                                    <div className="space-y-4">
                                        <InfoItem icon={<Mail size={16} />} label="Email Address" value={data.email} />
                                        <InfoItem icon={<Phone size={16} />} label="Phone Number" value={data.phone} />
                                    </div>
                                    <div className="space-y-4">
                                        <InfoItem icon={<Clock size={16} />} label="Timezone" value={data.timezone} />
                                        <InfoItem icon={<Calendar size={16} />} label="Created At" value={new Date(data.createdAt).toLocaleDateString()} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* --- RIGHT COLUMN: SUBSCRIPTION & BILLING --- */}
                    <div className="space-y-8">
                        <Card className="effect border-none shadow-lg overflow-hidden">
                            <div className="p-6">
                                <h3 className="font-bold  mb-4">Billing Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm  italic">Monthly Fee</span>
                                        <span className="text-3xl font-black  leading-none">${data.plan.priceMonthly}</span>
                                    </div>
                                    <Separator />
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="">Plan Expiry</span>
                                            <span className="font-semibold text-red-500">{new Date(data.planExpiresAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="">Trial Period</span>
                                            <span className="font-semibold text-emerald-600 italic">Ends in {data.plan.trialDays} days</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors ">
                                        Manage Subscription
                                    </button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 border-dashed border-2 border-slate-200 bg-transparent">
                            <h4 className="text-sm font-bold  mb-3">System Flags</h4>
                            <div className="flex flex-wrap gap-2">
                                {/* Shadcn Badge e variant kaj korbe, kintu Icon er upor variant deya jabe na */}
                                <Badge variant="outline" className=" border-slate-200">
                                    Currency: {data.currency}
                                </Badge>

                                <Badge variant="outline" className=" border-slate-200">
                                    Format: {data.dateFormat}
                                </Badge>

                                {data.isSuspended && (
                                    <Badge variant="destructive">
                                        Suspended
                                    </Badge>
                                )}
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg ">{icon}</div>
            <div>
                <p className="text-[10px] uppercase font-bold tracking-tight leading-none mb-1">{label}</p>
                <p className="font-medium  break-all">{value}</p>
            </div>
        </div>
    );
}