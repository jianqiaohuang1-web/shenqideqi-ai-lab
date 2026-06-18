"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const TABLE_NAME = "portfolio_visits"

function getOrCreateStorageId(storage: Storage, key: string) {
  const existing = storage.getItem(key)
  if (existing) return existing

  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  storage.setItem(key, value)
  return value
}

async function getClientIp() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store",
    })
    if (!response.ok) return null
    const data = (await response.json()) as { ip?: string }
    return data.ip ?? null
  } catch {
    return null
  }
}

export function VisitTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return
    if (typeof window === "undefined") return

    let cancelled = false

    async function trackVisit() {
      const pagePath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`
      const visitorId = getOrCreateStorageId(
        window.localStorage,
        "sq_ai_lab_visitor_id",
      )
      const sessionId = getOrCreateStorageId(
        window.sessionStorage,
        "sq_ai_lab_session_id",
      )
      const ipAddress = await getClientIp()

      if (cancelled) return

      const payload = {
        page_path: pagePath,
        page_url: window.location.href,
        referrer: document.referrer || null,
        visitor_id: visitorId,
        session_id: sessionId,
        ip_address: ipAddress,
        user_agent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
      }

      try {
        await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
          keepalive: true,
        })
      } catch {
        // Analytics must never block the portfolio page.
      }
    }

    void trackVisit()

    return () => {
      cancelled = true
    }
  }, [pathname, searchParams])

  return null
}
