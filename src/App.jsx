import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "";

export default function App() {
  const [health, setHealth] = useState(null);
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        const h = await fetch(`${API}/health`);
        const i = await fetch(`${API}/api/info`);
        if (!h.ok) throw new Error(`health: ${h.status}`);
        if (!i.ok) throw new Error(`info: ${i.status}`);
        setHealth(await h.json());
        setInfo(await i.json());
      } catch (e) {
        setErr(String(e?.message || e));
      }
    })();
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="mark" aria-hidden="true"></div>
          <div>
            <div className="brandName">ORKIO™</div>
            <div className="brandSub">v5.3 • Clean Deploy Starter</div>
          </div>
        </div>

        <a className="btn" href="https://wa.me/5551989697605?text=Ol%C3%A1!%20Quero%20agendar%20uma%20demo%20do%20ORKIO." target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </header>

      <main className="hero">
        <div className="card heroCard">
          <div className="chip">Private Beta • B2B-ready • Segurança & Governança</div>
          <h1>Orkio — Governable AI para executar operações reais</h1>
          <p className="lead">
            Uma <b>IA executiva</b> que coordena agentes, integra sistemas e executa processos com
            <b> governança</b>, <b>trilha de auditoria</b> e <b>segurança por design</b>.
          </p>
          <div className="small muted">
            Ideal para processos regulados: finanças, crédito, compliance, backoffice e operações.
          </div>

          <div className="row">
            <a className="btn primary" href="#contato">Agendar demo (15 min)</a>
            <a className="btn" href="#arquitetura">Ver arquitetura</a>
          </div>

          <div className="status">
            <div className="statusItem">
              <div className="k">API Base</div>
              <div className="v">{API || "(não definida)"}</div>
            </div>
            <div className="statusItem">
              <div className="k">Health</div>
              <div className="v">{health ? "OK" : err ? "ERRO" : "..."}</div>
            </div>
          </div>

          {err ? (
            <pre className="error">Erro: {err}</pre>
          ) : (
            <pre className="pre">{JSON.stringify({ health, info }, null, 2)}</pre>
          )}
        </div>

        <section id="arquitetura" className="grid">
          <div className="card">
            <h2>Arquitetura (mínima e sólida)</h2>
            <ul className="small">
              <li><b>Backend:</b> Fastify com CORS e endpoints /health e /api/*</li>
              <li><b>Frontend:</b> Vite+React (SPA), servido por Nginx</li>
              <li><b>Deploy:</b> 2 serviços (API e WEB), cada um com Dockerfile</li>
              <li><b>Objetivo:</b> base estável para evoluir Orkio sem quebrar publicação</li>
            </ul>
          </div>

          <div className="card">
            <h2>Próximos upgrades (Orkio real)</h2>
            <ul className="small">
              <li>Adicionar autenticação e multi-tenant</li>
              <li>Integrar tRPC/routers do V5.2</li>
              <li>Conectar storage, RAG, agentes e auditoria</li>
              <li>Página /admin e /chat (gradualmente)</li>
            </ul>
          </div>
        </section>

        <section id="contato" className="card">
          <h2>Contato</h2>
          <p className="muted small">Form simples com mailto (rápido e sem backend). Depois migramos para endpoint /api/lead.</p>

          <form className="form" action="mailto:daniel@patroai.com,dangraebin@gmail.com" method="post" encType="text/plain">
            <label>Nome<input name="nome" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Empresa<input name="empresa" /></label>
            <label>Use case<textarea name="usecase" rows="4" required /></label>

            <label className="consent">
              <input type="checkbox" required />
              Concordo em ser contatado e com o uso dos dados para retorno comercial.
            </label>

            <div className="row">
              <button className="btn primary" type="submit">Enviar</button>
              <a className="btn" href="#">Voltar ao topo</a>
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <span>© ORKIO™ • PatroAI</span>
        <span className="muted small">Starter v5.3.0</span>
      </footer>
    </div>
  );
}
