import { ArrowUpRight } from "lucide-react";
export default function Hero() {
  return (
    <main className="hero mx-auto max-w-380  px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
      <section className="info flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-center">
          El control absoluto de tus gastos recurrentes
        </h1>
        <p className="text-lg text-center text-fg-muted mt-4">
          Descubre suscripciones olvidadas, optimiza tus planes y ahorra cientos
          de euros cada año con un gestor financiero diseñado con la precisión
          de Linear y la seguridad de Stripe.
        </p>
        <div className="hero__cta flex flex-row gap-6 items-center justify-center mt-8">
          <button className="btn btn--brand text-sm flex items-center">
            Empieza gratis
            <ArrowUpRight className="ml-2" size={16} />
          </button>
          <button className="btn btn--outline">Ver como funciona</button>
        </div>
      </section>
      <section className="preview">
        <img
          src="/recurrent-hero-card.svg"
          alt="Preview"
          className="mx-auto mt-8"
        />
      </section>
    </main>
  );
}
