<template>
  <div v-if="project" class="project-detail-page">
    <section class="project-detail-hero">
      <div class="project-detail-grid"></div>
      <div class="container project-detail-hero__inner">
        <router-link to="/projetos" class="project-detail-back">← Lab de Impacto</router-link>

        <div class="project-detail-meta">
          <span class="project-detail-pill">Projeto</span>
          <span class="project-detail-pill project-detail-pill--muted">{{ project.id === 1 ? '2023 - 2024' : 'Ativo' }}</span>
        </div>

        <h1 class="project-detail-title">{{ project.title }}</h1>
        <p v-if="project.organization" class="project-detail-org">{{ project.organization }}</p>
        <p v-if="project.impact" class="project-detail-impact">{{ project.impact }}</p>
      </div>
    </section>

    <article class="project-detail-body">
      <div class="container project-detail-layout">
        <aside class="project-detail-aside">
          <div class="project-detail-image-shell">
            <img :src="project.image || fallbackImage" :alt="project.title" />
          </div>

          <div class="project-detail-card">
            <h3>Quer algo assim?</h3>
            <p>
              Trabalhamos com organizações, redes e iniciativas públicas para estruturar projetos com mais clareza, impacto e incidência.
            </p>
            <router-link to="/contatos" class="project-detail-cta">Falar com consultoria</router-link>
          </div>
        </aside>

        <main class="project-detail-content">
          <section class="project-detail-block">
            <div class="project-detail-block__header">
              <span class="project-detail-block__kicker"></span>
              <h2>Contexto</h2>
            </div>
            <div class="project-detail-text" v-html="project.description || project.desc || 'Descrição do projeto não informada.'"></div>
          </section>

          <section class="project-detail-block">
            <div class="project-detail-block__header">
              <span class="project-detail-block__kicker project-detail-block__kicker--red"></span>
              <h2>Resultado</h2>
            </div>
            <div class="project-detail-text" v-html="project.content || project.solution || 'Detalhes da solução não informados.'"></div>
          </section>

          <section v-if="projectTags.length" class="project-detail-block">
            <div class="project-detail-block__header">
              <span class="project-detail-block__kicker project-detail-block__kicker--lime"></span>
              <h2>Tags</h2>
            </div>
            <div class="project-detail-tags">
              <span v-for="tag in projectTags" :key="tag.label || tag" class="project-detail-tag">
                {{ tag.label || tag }}
              </span>
            </div>
          </section>
        </main>
      </div>
    </article>
  </div>

  <div v-else class="container section-padding text-center" style="margin-top: 100px;">
    <h2>Projeto não encontrado</h2>
    <router-link to="/projetos" class="project-detail-cta" style="margin-top: 20px; display: inline-flex;">Voltar</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'

const route = useRoute()
const fallbackImage = 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=1200'
const project = computed(() => {
  const id = route.params.id
  return (siteContent.projects || []).find(p => String(p.id) === String(id) || String(p.id) === String(parseInt(id)))
})

const projectTags = computed(() => {
  const tags = project.value?.tags
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(label => ({ label: label.trim() }))
  }
  return []
})
</script>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 230, 90, 0.18), transparent 30%),
    radial-gradient(circle at top right, rgba(223, 32, 40, 0.08), transparent 24%),
    #f6f2ea;
  color: #1c1c1c;
}

.container {
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.project-detail-hero {
  position: relative;
  padding: 190px 0 80px;
  overflow: hidden;
}

.project-detail-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(28, 28, 28, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(28, 28, 28, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.5;
}

.project-detail-hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-detail-back {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  font-family: "Inter", sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #1c1c1c;
  text-decoration: none;
}

.project-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.project-detail-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border: 2px solid #1c1c1c;
  border-radius: 9999px;
  background: #ffe65a;
  font-family: "Inter", sans-serif;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.project-detail-pill--muted {
  background: rgba(255, 255, 255, 0.75);
}

.project-detail-title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.92;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  max-width: 11ch;
}

.project-detail-org {
  font-family: "Inter", sans-serif;
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #df2028;
}

.project-detail-impact {
  font-family: "Georgia", serif;
  font-size: 1.3rem;
  line-height: 1.6;
  max-width: 720px;
  color: #4b5563;
}

.project-detail-body {
  padding: 10px 0 120px;
}

.project-detail-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 56px;
  align-items: start;
}

.project-detail-aside {
  position: sticky;
  top: 110px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-detail-image-shell {
  border-radius: 1.75rem;
  overflow: hidden;
  border: 3px solid #1c1c1c;
  box-shadow: 10px 10px 0 #1c1c1c;
  background: #fff;
}

.project-detail-image-shell img {
  width: 100%;
  height: auto;
  display: block;
}

.project-detail-card {
  background: #ffffff;
  border: 3px solid #1c1c1c;
  border-radius: 1.5rem;
  padding: 28px;
  box-shadow: 8px 8px 0 #1c1c1c;
}

.project-detail-card h3 {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.project-detail-card p {
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #5b6472;
  margin-bottom: 20px;
}

.project-detail-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 18px;
  border-radius: 9999px;
  border: 2px solid #1c1c1c;
  background: #1c1c1c;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.project-detail-cta:hover {
  transform: translateY(-2px);
  background: #df2028;
}

.project-detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-detail-block {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(28, 28, 28, 0.08);
  border-radius: 1.5rem;
  padding: 28px;
  box-shadow: 6px 6px 0 rgba(28, 28, 28, 0.12);
}

.project-detail-block__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.project-detail-block__header h2 {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.project-detail-block__kicker {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #ffe65a;
  box-shadow: 0 0 0 6px rgba(255, 230, 90, 0.25);
}

.project-detail-block__kicker--red {
  background: #df2028;
  box-shadow: 0 0 0 6px rgba(223, 32, 40, 0.12);
}

.project-detail-block__kicker--lime {
  background: #a4cd39;
  box-shadow: 0 0 0 6px rgba(164, 205, 57, 0.18);
}

.project-detail-text {
  font-family: "Georgia", serif;
  font-size: 1.12rem;
  line-height: 1.9;
  color: #334155;
}

:deep(.project-detail-text p) {
  margin-bottom: 18px;
}

.project-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.project-detail-tag {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border: 2px solid #1c1c1c;
  border-radius: 9999px;
  background: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

@media (max-width: 992px) {
  .project-detail-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .project-detail-aside {
    position: static;
  }

  .project-detail-hero {
    padding: 140px 0 60px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.25rem;
  }

  .project-detail-title {
    max-width: 100%;
  }

  .project-detail-block,
  .project-detail-card {
    padding: 22px;
  }
}
</style>
