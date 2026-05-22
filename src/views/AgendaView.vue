<template>
  <div class="agenda-view pt-24 pb-20">
    <div class="container mx-auto px-4 max-w-5xl">
      
      <!-- HERO AGENDA -->
      <header class="mb-16 reveal">
        <div class="inline-block border-4 border-black px-4 py-2 mb-6 bg-amarelo">
          <span class="font-black text-xl tracking-tighter uppercase">Nossa Agenda</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
          <span class="text-black">EVENTOS &</span><br />
          <span class="text-transparent" style="-webkit-text-stroke: 2px #A55EEA;">MOBILIZAÇÕES</span>
        </h1>
        <p class="text-xl md:text-2xl font-medium max-w-3xl leading-snug">
          Encontros, aulas abertas e convocações para ação. Conecte-se com a nossa rede no território e no digital.
        </p>
      </header>

      <!-- UPCOMING EVENTS -->
      <section class="mb-20">
        <h2 class="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-2">Próximos Eventos</h2>
        
        <div v-if="upcomingEvents.length === 0" class="border-4 border-black p-8 bg-gray-50 text-center">
          <p class="font-bold text-xl">Nenhuma mobilização agendada no momento.</p>
          <p class="mt-2 text-gray-600">Assine nossa newsletter para ser avisado sobre novas datas.</p>
        </div>

        <div class="space-y-6">
          <article v-for="evento in upcomingEvents" :key="evento.id" class="event-card border-4 border-black p-6 bg-white flex flex-col md:flex-row gap-6 hover:shadow-[8px_8px_0px_#1C1C1C] transition-all">
            
            <!-- DATA BOX -->
            <div class="date-box flex-shrink-0 flex flex-col items-center justify-center border-4 border-black p-4 bg-verde w-32 h-32">
              <span class="text-4xl font-black">{{ getDay(evento.date) }}</span>
              <span class="text-lg font-bold uppercase">{{ getMonth(evento.date) }}</span>
            </div>

            <!-- EVENT INFO -->
            <div class="flex-grow flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-2">
                <span class="badge bg-black text-white px-3 py-1 text-xs font-bold uppercase">{{ evento.type || 'Evento' }}</span>
                <span class="text-sm font-bold flex items-center gap-1">
                  <Clock :size="14" /> {{ getTime(evento.date) }}
                </span>
                <span class="text-sm font-bold flex items-center gap-1">
                  <MapPin :size="14" /> {{ evento.location }}
                </span>
              </div>
              <h3 class="text-2xl font-black mb-2">{{ evento.title }}</h3>
              <p class="mb-4 text-gray-700">{{ evento.description }}</p>
              
              <div>
                <a v-if="evento.link" :href="evento.link" target="_blank" class="btn-brutal btn-vermelho text-sm py-2 px-6 inline-flex items-center gap-2">
                  INSCREVA-S <ExternalLink :size="16" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- PAST EVENTS -->
      <section v-if="pastEvents.length > 0">
        <h2 class="text-2xl font-black uppercase mb-8 border-b-4 border-black pb-2 text-gray-400">Eventos Anteriores</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <article v-for="evento in pastEvents" :key="evento.id" class="border-2 border-black p-4 bg-gray-50 opacity-70 hover:opacity-100 transition-opacity">
            <div class="flex items-center gap-2 mb-2 text-sm font-bold text-gray-500">
              <Calendar :size="14" /> {{ formatDate(evento.date) }}
            </div>
            <h3 class="text-xl font-black mb-2">{{ evento.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2">{{ evento.description }}</p>
          </article>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Clock, MapPin, Calendar, ExternalLink } from 'lucide-vue-next'
import { siteContent } from '../store/content'

// Simulando eventos se ainda não existirem
const eventsList = computed(() => {
  return siteContent.events || [
    {
      id: 1,
      title: 'Workshop: Mapeamento de Redes no Poder Local',
      description: 'Uma imersão prática de 4 horas ensinando como identificar atores de influência no seu território usando dados abertos.',
      date: new Date(Date.now() + 86400000 * 5).toISOString(), // Daqui a 5 dias
      location: 'Zoom (Online)',
      type: 'Aula Aberta',
      link: 'https://sympla.com.br'
    },
    {
      id: 2,
      title: 'Lançamento do Relatório Interseccional',
      description: 'Apresentação presencial dos dados coletados na última pesquisa de campo sobre autonomia econômica feminina.',
      date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 dias atrás
      location: 'São Paulo, SP',
      type: 'Lançamento',
      link: ''
    }
  ]
})

const upcomingEvents = computed(() => {
  const now = new Date()
  return eventsList.value.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date))
})

const pastEvents = computed(() => {
  const now = new Date()
  return eventsList.value.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date))
})

const getDay = (dateStr) => {
  return new Date(dateStr).getDate().toString().padStart(2, '0')
}

const getMonth = (dateStr) => {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
  return months[new Date(dateStr).getMonth()]
}

const getTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('pt-BR')
}
</script>
