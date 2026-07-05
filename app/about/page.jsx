'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020617]">
        <section className="relative overflow-hidden py-20">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-200/40 dark:bg-orange-500/20 blur-3xl" />
          <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-sky-200/30 dark:bg-sky-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:px-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-32">
            <div className="space-y-8 py-8">
              <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600 shadow-sm">
                نبذة عنا
              </span>
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
                  جمال طبيعي. تجربة فاخرة. قصة تبدأ معك.
                </h1>
                <p className="max-w-2xl text-base text-[var(--foreground)]/80 md:text-lg">
                  في Elham Beauty، نؤمن بأن الجمال الحقيقي ينبع من البساطة والثقة. نجمع بين منتجات العناية الفاخرة والتسوق السلس لتمنحك إشراقة متجددة في كل يوم.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50">
                    <p className="text-3xl font-semibold text-orange-600">2024</p>
                    <p className="mt-3 text-sm text-[var(--foreground)]/75">تأسس متجرنا ليكون وجهة الجمال الأولى في السودان.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50">
                    <p className="text-3xl font-semibold text-sky-600">+1000</p>
                    <p className="mt-3 text-sm text-[var(--foreground)]/75">عملاء سعداء وثقة متنامية يومًا بعد يوم.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/all-products" className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition hover:bg-orange-700">
                    تسوق الآن
                  </Link>
                  <Link href="/cart" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-orange-300 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-orange-400">
                    عرض سلة التسوق
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-200/30 dark:bg-orange-500/20 blur-3xl" />
              <div className="absolute left-4 bottom-6 h-24 w-24 rounded-full bg-sky-200/30 dark:bg-sky-500/20 blur-2xl" />
              <div className="space-y-6">
                <div className="rounded-[2rem] bg-[#E6E9F2] p-6 shadow-inner shadow-slate-100 dark:bg-slate-800 dark:shadow-slate-900/40">
                  <div className="h-80 rounded-[1.75rem] bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-[var(--foreground)]">منتجاتنا المميزة</h2>
                  <p className="text-sm text-[var(--foreground)]/75">
                    مجموعة مختارة من مستحضرات التجميل والعناية بالبشرة لتعزيز إشراقة صحية بمكونات موثوقة.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow shadow-slate-100 dark:bg-slate-900 dark:shadow-slate-900/60 dark:border dark:border-slate-800">
                    <p className="text-sm uppercase tracking-[0.2em] text-orange-500">تركيزنا</p>
                    <p className="mt-3 text-sm text-[var(--foreground)]">منتجات آمنة ومكونات بعناية لضمان نتائج ملموسة.</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow shadow-slate-100 dark:bg-slate-900 dark:shadow-slate-900/60 dark:border dark:border-slate-800">
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-500">رؤيتنا</p>
                    <p className="mt-3 text-sm text-[var(--foreground)]">أن تكوني دائمًا جاهزة لليوم بمنتجات تثري جمالك الطبيعي.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 py-16">
          <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-32">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-100 dark:bg-slate-900 dark:shadow-slate-900/60">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">رؤيتنا</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/75">
                  بناء مجتمع يهتم بالجمال الراقي ويعزّز الثقة في كل إطلالة.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-100 dark:bg-slate-900 dark:shadow-slate-900/60">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">رسالتنا</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/75">
                  تقديم تجربة تسوق مريحة مع منتجات موثوقة ومظهر متألق يوميًا.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-100 dark:bg-slate-900 dark:shadow-slate-900/60">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">قيمنا</h3>
                <ul className="mt-4 space-y-3 text-sm text-[var(--foreground)]/75">
                  <li>نقاء المكونات</li>
                  <li>خدمة مميزة</li>
                  <li>تصميم أنيق</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
