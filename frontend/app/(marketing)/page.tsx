"use client"

import { Sparkles, Zap } from "lucide-react"
import Navbar from "@/components/marketing/Navbar"
import Footer from "@/components/marketing/Footer"
import OrgMarquee from "@/components/marketing/OrgMarquee"
import { ScrollReveal } from "@/components/marketing/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/constants/color"
import { HOME_BOARD_COLUMNS, HOME_FEATURES, HOME_TAGS, HOME_TAG_STYLES } from "@/constants/homeHelpers"
import Link from "next/link"

const StatusTags = () => {
  return (
    <div className="col-span-full mt-2 flex flex-wrap gap-2 text-[11px]">
      {HOME_TAGS.map((tag) => {
        const style = HOME_TAG_STYLES[tag]

        return (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 rounded-full border border-solid px-2 py-0.5 ${style.border} ${style.bg} ${style.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            <span>{tag}</span>
          </span>
        )
      })}
    </div>
  )
}

const BoardPreview = () => {
  return (
    <div className="relative">
      <div className="absolute -left-6 -top-6 h-16 w-16 rounded-3xl border-4 border-dashed border-yellow-300/80" />
      <div className="absolute -right-4 bottom-10 h-14 w-14 rounded-full bg-amber-100/80 blur-xl" />
      <Card className="relative overflow-hidden rounded-3xl border-dashed border-black bg-white shadow-xl backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-dashed border-slate-200">
          <CardTitle className="text-lg font-semibold text-black">Sprint Playground</CardTitle>
          <div className="flex items-center gap-2 text-sm text-black">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Comic mode</span>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
          {HOME_BOARD_COLUMNS.map((column) => (
            <div
              key={column.name}
              className={`flex flex-col gap-3 rounded-2xl border p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${column.color}`}
            >
              <div className="flex items-center justify-between ">
                <span className="font-semibold text-black">{column.name}</span>
                <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-xs text-black">
                  {column.items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-dashed border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <StatusTags />
        </CardContent>
      </Card>
    </div>
  )
}

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar
        items={[
          { path: "/", label: "Home" },
          { path: "/docs", label: "Docs" },
        ]}
      />

      <main
        style={{
          background: `radial-gradient(circle at top left, ${colors.accentSoft}66 0, transparent 55%), radial-gradient(circle at bottom right, ${colors.accentSoft}80 0, transparent 60%)`,
        }}
        className="flex-1 bg-white text-slate-900"
      >
        <div className="mx-auto flex max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex-col gap-12 px-6 pb-20 pt-14 sm:px-10">
          <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <ScrollReveal direction="up" delay={0}>
                <Badge variant="outline" className="w-fit border border-dashed border-black bg-white text-xs uppercase tracking-wide text-black shadow-sm">
                  From org to team
                </Badge>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-black">
                    One playful space for{" "}
                    <br />
                    <span className="font-brand-italic text-5xl">your whole organization</span>
                  </h1>
                  <p className="text-lg text-black sm:text-xl">
                    HiveSpace lets you create organizations, spin up workspaces, nest multiple projects, and give every team a clear place to track their work.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="rounded-full bg-black px-6 text-white hover:bg-black h-12">
                  Start a board
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="rounded-full border-dashed border-black bg-white px-6 text-black h-12"
                  asChild
                >
                  <Link href="/docs">
                  View docs
                  </Link>
                </Button>
                <span className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-slate-600 shadow-sm backdrop-blur border border-dashed border-amber-900 h-10">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Setup in under 2 minutes</span>
                </span>
              </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.15}>
              <BoardPreview />
            </ScrollReveal>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {HOME_FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="up" delay={i * 0.1}>
              <Card
                className="h-full rounded-2xl border-dashed border-slate-200 bg-white shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.copy}</p>
                </CardContent>
              </Card>
              </ScrollReveal>
            ))}
          </section>

          <OrgMarquee />

          <ScrollReveal direction="up" delay={0}>
          <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 shadow-sm backdrop-blur md:flex md:items-center md:justify-between">
            <div className="space-y-2">
              <Badge variant="outline" className="border border-dashed border-slate-200 bg-amber-50 text-amber-700">
                Friendly launchpad
              </Badge>
              <p className="text-2xl font-semibold text-black">Ship faster with a board that feels light.</p>
              <p className="text-black">
                Bring structure, keep the humor, and keep your team focused on what matters.
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <Button className="rounded-full bg-slate-100 px-5 text-slate-900 hover:bg-white h-10">
                Create project
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-dashed border-slate-500 bg-transparent px-5 text-slate-900 h-10 hover:bg-slate-50"
              >
                Talk to us
              </Button>
            </div>
          </section>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
