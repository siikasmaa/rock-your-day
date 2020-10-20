import React from 'react'
import ReactDOM from 'react-dom/server'
import {
  getAssetFromKV,
  serveSinglePageApp
} from '@cloudflare/kv-asset-handler'
import { Page } from './public/page'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const defaultHeaders = {
  'Referrer-Policy': 'strict-origin',
  'Content-Security-Policy': 'frame-ancestors none',
  'Strict-Transport-Security': 'max-age=3600; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'deny'
}

const shouldSsr = (request: Request): boolean => {
  const { pathname = '' } = new URL(request.url)
  const userAgent = request.headers.get('user-agent') || ''
  if (/\/static/.test(pathname)) {
    return false
  }
  // Just default to SSR for all bots ¯\_(ツ)_/¯
  if (userAgent.includes('bot')) {
    return true
  }
  return false
}

export const handleRequest = async (event: FetchEvent): Promise<Response> => {
  try {
    const res = await getAssetFromKV(event, {
      mapRequestToAsset: serveSinglePageApp
    })

    if (shouldSsr(event.request)) {
      const ssrPage = ReactDOM.renderToString(
        React.createElement(Page, { isSSR: true })
      )
      const transformedRes = new HTMLRewriter()
        .on('body', {
          element(element) {
            element.prepend(ssrPage, { html: true })
          }
        })
        .transform(res)
      return transformedRes
    }

    return res
  } catch (e) {
    try {
      const notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req =>
          new Request('https://rockyourdaysoundboard/index.html', req)
      })

      return notFoundResponse
    } finally {
      return new Response('internal serverless error', { status: 500 })
    }
  }
}
