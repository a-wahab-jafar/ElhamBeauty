'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-[var(--foreground)]">
        <section className="relative overflow-hidden py-20">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-200/40 dark:bg-orange-500/20 blur-3xl" />
          <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-200/30 dark:bg-sky-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 md:px-16 lg:px-32">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-8 py-8">
                <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-orange-400">
                  تواصل معنا
                </span>
                <div className="space-y-6">
                  <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                    مرحبًا بك في خدمة العملاء التي تهتم بكل تفاصيلك.
                  </h1>
                  <p className="max-w-2xl text-base text-[var(--foreground)]/80 md:text-lg">
                    فريق Elham Beauty هنا للإجابة عن أسئلتك ومساعدتك في اختيار المنتجات المثالية. سواء كان لديك استفسار عن الطلب أو المكونات أو العروض، نحن إلى جانبك.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
                    <p className="text-sm uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">الهاتف</p>
                    <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">+249-90-508-1728</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">البريد الإلكتروني</p>
                    <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">elham.beauty617@<br />gmail.com</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
                  <h2 className="text-xl font-semibold">موضوع استفسارك</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/75">
                    اختر فئة الاستفسار المناسبة لرسالتك: دعم الطلب، معلومات المنتج، التعاون، أو أي سؤال آخر.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] bg-[#E6E9F2] p-6 dark:bg-slate-800">
                    <h2 className="text-2xl font-semibold">أرسل لنا رسالة</h2>
                    <p className="mt-3 text-sm text-[var(--foreground)]/75">
                      املأ هذا النموذج وسنتواصل معك في أقرب وقت ممكن.
                    </p>
                  </div>
                  <form className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-[var(--foreground)]/80">
                        الاسم الكامل
                        <input
                          type="text"
                          placeholder="اسمك"
                          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-[var(--foreground)]/80">
                        البريد الإلكتروني
                        <input
                          type="email"
                          placeholder="example@mail.com"
                          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950"
                        />
                      </label>
                    </div>
                    <div className="space-y-2 text-sm text-[var(--foreground)]/80">
                      <label>رسالتك</label>
                      <textarea
                        rows="5"
                        placeholder="اكتب رسالتك هنا"
                        className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm text-[var(--foreground)] outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition hover:bg-orange-700 dark:shadow-orange-500/30"
                    >
                      أرسل الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
