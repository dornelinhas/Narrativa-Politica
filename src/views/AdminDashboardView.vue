<template>
  <div class="admin-premium-wrapper">
    <!-- SIDEBAR Apple-style -->
    <aside class="admin-sidebar-v2">
      <div class="sidebar-brand">
        <router-link to="/" class="logo-group-v2">
          <div v-if="siteContent.settings.siteLogo" class="brand-logo-img">
            <img :src="siteContent.settings.siteLogo" alt="Narrativa Política" />
          </div>
          <div v-else class="logo-icon-compact-v2">
            <span class="logo-np-v2">NP</span>
            <div class="decoration-v2 sq-1-v2"></div>
            <div class="decoration-v2 sq-2-v2"></div>
          </div>
          <div class="logo-text-v2">
            <span class="name-top-v2">Narrativa</span>
            <span class="name-bottom-v2">Política</span>
          </div>
        </router-link>
      </div>

      <nav class="sidebar-menu-v2">
        <div class="menu-group" v-if="filteredMainTabs.length">
          <span class="group-label">Principal</span>
          <button v-for="tab in filteredMainTabs" :key="tab.id" 
                  @click="setActiveTab(tab.id)" 
                  :class="{ active: activeTab === tab.id }" 
                  class="menu-item-v2">
            <component :is="tab.icon" :size="18" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <div class="menu-group" v-if="filteredContentTabs.length">
          <span class="group-label">Conteúdo</span>
          <button v-for="tab in filteredContentTabs" :key="tab.id" 
                  @click="setActiveTab(tab.id)" 
                  :class="{ active: activeTab === tab.id }" 
                  class="menu-item-v2">
            <component :is="tab.icon" :size="18" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <div class="menu-group" v-if="filteredSystemTabs.length">
          <span class="group-label">Sistema</span>
          <button v-for="tab in filteredSystemTabs" :key="tab.id" 
                  @click="setActiveTab(tab.id)" 
                  :class="{ active: activeTab === tab.id }" 
                  class="menu-item-v2">
            <component :is="tab.icon" :size="18" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </nav>

      <div class="sidebar-footer-v2">
        <div class="user-profile-mini">
          <div class="avatar-v2 profile-gradient" :style="userProfile?.image ? { backgroundImage: `url(${userProfile.image})` } : {}">
            <span v-if="!userProfile?.image">{{ userProfile?.name?.charAt(0) || 'A' }}</span>
          </div>
          <div class="user-info-v2">
            <p class="user-name">{{ userProfile?.name || 'Anne Dornelas' }}</p>
            <p class="user-role">{{ userRoleLabel }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="btn-logout-v2">
          <LogOut :size="16" /> Sair
        </button>
      </div>
    </aside>

    <!-- ÁREA PRINCIPAL -->
    <main class="admin-main-hub">
      <header class="hub-top-bar">
        <div class="hub-path">
          <span class="text-soft">Ecossistema</span>
          <ChevronRight :size="14" class="text-soft" />
          <span class="path-active">{{ currentTabLabel }}</span>
        </div>
        
        <div class="hub-actions-v2">
          <button v-if="showNewButton" @click="createNew" class="btn-primary-premium action-main-gradient">
            <Plus :size="18" /> 
            {{ activeTab === 'newsletters' ? 'Criar Newsletter' : 
               activeTab === 'team' ? 'Adicionar Membro à Equipe' : 
               `Novo ${currentTabLabel}` }}
          </button>
        </div>
      </header>

      <div class="hub-scroll-content">
        <!-- DASHBOARD -->
        <div v-if="!editingItem && activeTab === 'dashboard'" class="dashboard-executive-v2">
          
          <!-- EXECUTIVE GREETING -->
          <header class="dashboard-welcome">
            <div class="welcome-text">
              <h1>Boas-vindas, {{ userProfile?.name?.split(' ')[0] || 'Anne' }}</h1>
              <p>Aqui está o panorama geral do seu ecossistema hoje.</p>
            </div>
            <div class="welcome-actions">
              <button @click="setActiveTab('newsletters')" class="btn-primary-premium action-main-gradient">
                <Zap :size="18" /> Novo Disparo
              </button>
            </div>
          </header>

          <!-- KPI GRID REFINED -->
          <div class="kpi-grid-refined">
            <div v-for="s in stats" :key="s.label" class="kpi-card-minimal">
              <div class="kpi-icon-v2" :class="s.color"><component :is="s.icon" :size="20" /></div>
              <div class="kpi-data">
                <span class="kpi-label">{{ s.label }}</span>
                <span class="kpi-value">{{ s.value }}</span>
              </div>
              <div class="kpi-trend positive">
                <TrendingUp :size="14" /> 12%
              </div>
            </div>
          </div>

          <div class="dashboard-main-grid">
            <!-- ENGAGEMENT -->
            <section class="dashboard-card-refined chart-area">
              <div class="d-card-header">
                <h3>Impacto e Engajamento</h3>
                <p>Crescimento orgânico da rede nos últimos 30 dias.</p>
              </div>
              <div class="chart-wrapper-v2">
                <ImpactChart />
              </div>
            </section>

            <!-- OPERATIONS & ACTIVITY -->
            <div class="dashboard-side-column">
              <section class="dashboard-card-refined">
                <div class="d-card-header">
                  <h3>Operações Recentes</h3>
                </div>
                <div class="activity-list-refined">
                  <div v-for="item in siteContent.lastActivity?.slice(0, 5)" :key="item.id" class="activity-row-v2">
                    <div class="act-indicator" :class="getActivityClass(item.type)"></div>
                    <div class="act-body">
                      <p class="act-title-v2">{{ item.title }}</p>
                      <p class="act-meta-v2">{{ item.date }} • {{ item.type }}</p>
                    </div>
                  </div>
                  <div v-if="!siteContent.lastActivity?.length" class="empty-activity-v2">
                    Nenhuma atividade recente registrada.
                  </div>
                </div>
              </section>

              <section class="dashboard-card-refined shortcut-area">
                <div class="d-card-header">
                  <h3>Acesso Rápido</h3>
                </div>
                <div class="shortcut-grid">
                  <button @click="setActiveTab('newsletters')" class="shortcut-btn">
                    <Mail :size="18" /> Newsletter
                  </button>
                  <button @click="setActiveTab('posts')" class="shortcut-btn">
                    <FileText :size="18" /> Editorial
                  </button>
                  <button @click="setActiveTab('paths')" class="shortcut-btn">
                    <BookOpen :size="18" /> Trilhas
                  </button>
                  <button @click="setActiveTab('settings')" class="shortcut-btn">
                    <Cog :size="18" /> Ajustes
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- LISTAGENS -->
        <div v-if="!editingItem && activeTab !== 'dashboard'" class="list-container-v2">
          <div v-if="['about', 'settings'].includes(activeTab)" class="singleton-hero-v2">
            <div class="singleton-icon-v2"><component :is="currentTabIcon" :size="48" /></div>
            <h2>{{ activeTab === 'about' ? 'Seu Perfil Público' : 'Configurações Globais' }}</h2>
            <p>{{ activeTab === 'about' ? 'Edite suas biografias e foto oficial.' : 'Gerencie Chave PIX e Logo do site.' }}</p>
            <button @click="editItem(activeTab, siteContent[activeTab])" class="btn-primary-premium action-main-gradient">
              <Edit3 :size="18" /> Editar Agora
            </button>
          </div>
          
          <div v-else class="premium-list-wrapper">
            <!-- TAB INSTITUTIONAL HEADER -->
            <header class="tab-institutional-header">
              <div class="t-header-info">
                <h2>Gestão de {{ currentTabLabel }}</h2>
                <p>Visualize e gerencie todos os registros deste módulo.</p>
              </div>
              <button @click="createNew" class="btn-primary-premium action-main-gradient">
                <Plus :size="18" /> {{ activeTab === 'newsletters' ? 'Escrever Newsletter' : 
                                      activeTab === 'team' ? 'Adicionar Perfil' :
                                      activeTab === 'opportunities' ? 'Publicar Vaga' :
                                      `Novo ${currentTabLabel}` }}
              </button>
            </header>
            <!-- NEWSLETTER DASHBOARD -->
            <template v-if="activeTab === 'newsletters'">
              <div class="newsletter-dashboard-v2">
                <div class="nw-stats-grid">
                  <div class="nw-stat-card main">
                    <div class="nw-stat-info">
                      <h3>Sua Audiência</h3>
                      <div class="nw-count">{{ siteContent.subscribers?.length || 0 }}</div>
                      <p>Inscritos ativos no ecossistema.</p>
                    </div>
                  </div>
                  <div class="nw-stat-card">
                    <h3>Edições Enviadas</h3>
                    <div class="nw-count-sm">{{ currentList.filter(n => n.status === 'Enviada').length }}</div>
                  </div>
                  <div class="nw-stat-card">
                    <h3>Rascunhos</h3>
                    <div class="nw-count-sm">{{ currentList.filter(n => n.status !== 'Enviada').length }}</div>
                  </div>
                </div>

                <!-- SEÇÃO DE RASCUNHOS -->
                <div class="dashboard-card-refined mt-32">
                  <div class="d-card-header">
                    <h3>Rascunhos em Edição</h3>
                    <p>Mensagens salvas que ainda não foram disparadas.</p>
                  </div>
                  <div class="drafts-list-v2">
                    <div v-for="item in currentList.filter(n => n.status !== 'Enviada')" :key="item.id" class="draft-row-v2">
                      <div class="draft-info">
                        <span class="draft-title">{{ item.subject || '(Sem Assunto)' }}</span>
                        <p class="draft-summary-preview" v-if="item.summary">{{ item.summary }}</p>
                        <span class="draft-meta">Criado em {{ item.date }} • Para: {{ item.recipients }}</span>
                      </div>
                      <div class="draft-actions">
                        <button @click="editItem(activeTab, item)" class="btn-icon-v2"><Edit3 :size="16" /></button>
                        <button @click="deleteItem(activeTab, item.id)" class="btn-icon-v2 del"><Trash2 :size="16" /></button>
                      </div>
                    </div>
                    <div v-if="!currentList.filter(n => n.status !== 'Enviada').length" class="empty-mini">
                      Nenhum rascunho pendente.
                    </div>
                  </div>
                </div>

                <!-- HISTÓRICO DE ENVIOS -->
                <div class="table-card-v2 mt-32">
                  <div class="card-header-v2">
                    <h3>Histórico de Envios (Anteriores)</h3>
                  </div>
                  <table class="saas-table">
                    <thead>
                      <tr>
                        <th>Assunto / Segmento</th>
                        <th>Status</th>
                        <th>Data de Envio</th>
                        <th class="text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in currentList.filter(n => n.status === 'Enviada')" :key="item.id">
                        <td>
                          <div class="item-text-stack">
                            <span class="item-title-v2">{{ item.subject }}</span>
                            <p class="item-summary-mini" v-if="item.summary">{{ item.summary }}</p>
                            <span class="item-subtitle-v2">Audiência: {{ item.recipients }}</span>
                          </div>
                        </td>
                        <td><span class="status-badge-v2 green">Enviada</span></td>
                        <td><span class="text-soft-v2">{{ item.date }}</span></td>
                        <td class="text-right">
                          <div class="action-group-v2">
                            <button @click="editItem(activeTab, item)" class="btn-icon-v2"><Search :size="16" /></button>
                            <button @click="deleteItem(activeTab, item.id)" class="btn-icon-v2 del"><Trash2 :size="16" /></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>

            <!-- LIBRARY DASHBOARD -->
            <template v-else-if="activeTab === 'library'">
              <div class="library-dashboard-v2">
                <div class="library-header-v2">
                  <div class="lh-info">
                    <p>Datasets, relatórios e publicações para sua audiência.</p>
                  </div>
                </div>

                <div class="library-grid-v2">
                  <div v-for="item in currentList" :key="item.id" class="lib-card-premium">
                    <div class="lib-card-top">
                      <div class="lib-icon-box" :class="item.type?.toLowerCase()">
                        <FileText v-if="item.type === 'Publicação'" :size="20" />
                        <Database v-else-if="item.type === 'Dataset'" :size="20" />
                        <Download v-else :size="20" />
                      </div>
                      <span class="lib-badge-v2">{{ item.type }}</span>
                    </div>
                    <div class="lib-card-body">
                      <h3>{{ item.title }}</h3>
                      <p>{{ item.description?.replace(/<[^>]*>/g, '').substring(0, 100) }}...</p>
                      <div v-if="item.fileName" class="lib-file-tag">
                        <Paperclip :size="12" /> {{ item.fileName }}
                      </div>
                    </div>
                    <div class="lib-card-footer">
                      <button @click="editItem(activeTab, item)" class="btn-ghost-v2 sm">Editar</button>
                      <button @click="deleteItem(activeTab, item.id)" class="btn-ghost-v2 sm del">Excluir</button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- TEAM DASHBOARD -->
            <template v-else-if="activeTab === 'team'">
              <div class="table-card-v2">
                <div class="card-header-v2">
                  <h3>Membros da Equipe</h3>
                  <p>Gerencie quem tem acesso ao painel e seus perfis públicos.</p>
                </div>
                <table class="saas-table">
                  <thead>
                    <tr>
                      <th>Membro / Perfil</th>
                      <th>Cargo / Acesso</th>
                      <th>E-mail de Cadastro</th>
                      <th class="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in currentList" :key="item.id">
                      <td>
                        <div class="item-cell-v2">
                          <div class="item-img-mini" v-if="item.image" :style="{ backgroundImage: `url(${item.image})` }"></div>
                          <div class="item-no-img" v-else><User :size="20" /></div>
                          <div class="item-text-stack">
                            <span class="item-title-v2">{{ item.name }}</span>
                            <span class="item-subtitle-v2">Desde {{ item.date }}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge-v2 role-badge" :class="item.role?.toLowerCase().replace(' ', '-')">
                          {{ item.role }}
                        </span>
                      </td>
                      <td><span class="text-soft-v2">{{ item.email }}</span></td>
                      <td class="text-right">
                        <div class="action-group-v2">
                          <button @click="editItem(activeTab, item)" class="btn-icon-v2"><Edit3 :size="16" /></button>
                          <button @click="deleteItem(activeTab, item.id)" class="btn-icon-v2 del"><Trash2 :size="16" /></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="!currentList?.length">
                      <td colspan="4" class="empty-state-v2">Nenhum membro da equipe adicionado ainda.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>

            <!-- OUTRAS LISTAGENS -->
            <div v-else class="table-card-v2">
              <table class="saas-table">
                <thead>
                  <tr>
                    <th>Informação</th>
                    <th>Classificação</th>
                    <th class="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in currentList" :key="item.id">
                    <td>
                      <div class="item-cell-v2">
                        <div class="item-img-mini" v-if="item.image" :style="{ backgroundImage: `url(${item.image})` }"></div>
                        <div class="item-no-img" v-else><component :is="currentTabIcon" :size="16" /></div>
                        <div class="item-text-stack">
                          <span class="item-title-v2">{{ item.title || item.name || item.subject }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="item-meta-stack">
                        <span class="badge-v2">{{ item.type || 'Padrão' }}</span>
                        <span class="badge-v2" v-if="item.category">{{ item.category }}</span>
                      </div>
                    </td>
                    <td class="text-right">
                      <div class="action-group-v2">
                        <button @click="editItem(activeTab, item)" class="btn-icon-v2"><Edit3 :size="16" /></button>
                        <button @click="deleteItem(activeTab, item.id)" class="btn-icon-v2 del"><Trash2 :size="16" /></button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!currentList?.length"><td colspan="3" class="empty-state-v2">Nenhum registro encontrado em {{ currentTabLabel }}.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- EDITOR -->
        <transition name="editor-slide">
          <div v-if="editingItem" class="premium-editor-overlay">
            <div class="editor-side-panel">
              <header class="editor-top-v2">
                <div class="editor-title-stack">
                  <span class="editor-eyebrow">{{ currentTabLabel }}</span>
                  <h2>{{ isNew ? 'Novo' : 'Editar' }} Registro</h2>
                </div>
                <button @click="editingItem = null" class="btn-close-v2"><X :size="20" /></button>
              </header>

              <form @submit.prevent="saveItem" class="editor-form-v2">
                <div class="form-scroll-area">
                  <!-- CAMPOS TITULO -->
                  <div class="form-group-v2 full" v-if="!['about', 'settings', 'team', 'newsletters'].includes(activeTab)">
                    <label>Título Principal</label>
                    <input type="text" v-model="editingItem.title" required class="input-hero-v2" />
                  </div>

                  <!-- TRILHAS -->
                  <template v-if="activeTab === 'paths'">
                    <div class="form-group-v2 full"><label>Título da Trilha</label><input type="text" v-model="editingItem.title" class="input-hero-v2" required /></div>
                    <div class="form-group-v2 full"><label>Subtítulo / Descrição Curta</label><textarea v-model="editingItem.subtitle" rows="2" placeholder="Resumo do que será aprendido..."></textarea></div>
                    
                    <div class="form-row-v2">
                      <div class="form-group-v2">
                        <label>Categoria</label>
                        <select v-model="editingItem.category">
                          <option value="Economia">Economia</option>
                          <option value="Gênero">Gênero</option>
                          <option value="Política">Política</option>
                          <option value="Tecnologia">Tecnologia</option>
                          <option value="Impacto Social">Impacto Social</option>
                        </select>
                      </div>
                      <div class="form-group-v2">
                        <label>Carga Horária</label>
                        <input type="text" v-model="editingItem.workload" placeholder="Ex: 20h" />
                      </div>
                    </div>

                    <div class="form-row-v2">
                      <div class="form-group-v2">
                        <label>Nível de Dificuldade</label>
                        <select v-model="editingItem.level">
                          <option value="Iniciante">Iniciante</option>
                          <option value="Intermediário">Intermediário</option>
                          <option value="Avançado">Avançado</option>
                          <option value="Especialista">Especialista</option>
                        </select>
                      </div>
                      <div class="form-group-v2">
                        <label>Certificado Automático?</label>
                        <div class="toggle-group-v2">
                          <label class="toggle-v2">
                            <input type="checkbox" v-model="editingItem.hasCertificate">
                            <span class="slider-v2"></span>
                          </label>
                          <span class="toggle-label-v2">{{ editingItem.hasCertificate ? 'Sim, emitir certificado' : 'Não emitir' }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="form-group-v2 full"><label>Capa da Trilha</label><Base64ImageUploader v-model="editingItem.image" /></div>
                    <div class="form-group-v2 full"><label>Apresentação / Ementa Completa</label><RichTextEditor v-model="editingItem.description" /></div>
                    
                    <!-- MODULOS BUILDER -->
                    <div class="lms-builder-v2 full">
                      <div class="lms-header-v2">
                        <div class="lms-title-stack">
                          <h3>Estrutura de Ensino</h3>
                          <p>Organize seu conteúdo em módulos e aulas sequenciais.</p>
                        </div>
                        <button type="button" @click="addModule" class="btn-primary-premium sm action-main-gradient">+ Adicionar Módulo</button>
                      </div>
                      
                      <div v-for="(mod, mIdx) in editingItem.modules" :key="mIdx" class="accordion-card-v2">
                        <div class="mod-handle-v3" @click="toggleModule(mIdx)">
                          <div class="mod-info-v2">
                            <span class="mod-tag-v2">Módulo {{ mIdx+1 }}</span>
                            <input type="text" v-model="mod.title" class="input-flat-v2" placeholder="Nome do Módulo" @click.stop />
                          </div>
                          <div class="mod-actions-v2">
                            <button type="button" @click.stop="editingItem.modules.splice(mIdx, 1)" class="btn-icon-v2 del sm"><Trash2 :size="14" /></button>
                            <ChevronRight :size="20" class="accordion-icon" :class="{ rotated: expandedModule === mIdx }" />
                          </div>
                        </div>

                        <div v-show="expandedModule === mIdx" class="module-body-v2">
                          <div class="form-group-v2">
                            <label>Descrição do Módulo</label>
                            <textarea v-model="mod.description" rows="2" placeholder="O que será abordado neste módulo..."></textarea>
                          </div>

                          <div class="lms-lessons-container">
                            <label class="lessons-label-v2">Aulas do Módulo</label>
                            <div v-for="(lesson, lIdx) in mod.lessons" :key="lIdx" class="lesson-card-v2">
                              <div class="lesson-header-v2">
                                <div class="lesson-title-v2">
                                  <span class="lesson-num-v2">{{ lIdx+1 }}</span>
                                  <input type="text" v-model="lesson.title" placeholder="Título da Aula" />
                                </div>
                                <button type="button" @click="mod.lessons.splice(lIdx, 1)" class="btn-del-mini"><Trash2 :size="14" /></button>
                              </div>
                              
                              <div class="lesson-expanded-builder-v2">
                                <!-- MULTIMEDIA SECTION -->
                                <div class="lms-sub-section">
                                  <div class="lms-sub-header">
                                    <label>Conteúdo Multimídia (Vídeos, Links Externos)</label>
                                    <button type="button" @click="addMultimedia(lesson)" class="btn-ghost-v2 sm">+ Adicionar Link</button>
                                  </div>
                                  <div v-for="(item, iIdx) in lesson.multimedia" :key="iIdx" class="item-builder-row">
                                    <input type="text" v-model="item.title" placeholder="Título do Vídeo/Link" class="input-minimal" />
                                    <input type="text" v-model="item.url" placeholder="URL (YouTube, Vimeo...)" class="input-minimal" />
                                    <select v-model="item.type" class="select-minimal">
                                      <option value="Video">Vídeo</option>
                                      <option value="Link">Link Externo</option>
                                      <option value="Audio">Áudio / Podcast</option>
                                    </select>
                                    <button type="button" @click="lesson.multimedia.splice(iIdx, 1)" class="btn-del-mini"><Trash2 :size="12" /></button>
                                  </div>
                                  <div v-if="!lesson.multimedia?.length" class="empty-mini-builder">Nenhum recurso multimídia adicionado.</div>
                                </div>

                                <!-- MATERIALS SECTION -->
                                <div class="lms-sub-section">
                                  <div class="lms-sub-header">
                                    <label>Materiais de Apoio (PDFs, Planilhas, Textos)</label>
                                    <button type="button" @click="addMaterial(lesson)" class="btn-ghost-v2 sm">+ Adicionar Material</button>
                                  </div>
                                  <div v-for="(mat, mIdx) in lesson.materials" :key="mIdx" class="item-builder-row">
                                    <input type="text" v-model="mat.title" placeholder="Nome do Material" class="input-minimal" />
                                    <input type="text" v-model="mat.url" placeholder="Link para download/acesso" class="input-minimal" />
                                    <select v-model="mat.type" class="select-minimal">
                                      <option value="PDF">Documento PDF</option>
                                      <option value="Link">Link de Apoio</option>
                                      <option value="Planilha">Planilha / Dado</option>
                                    </select>
                                    <button type="button" @click="lesson.materials.splice(mIdx, 1)" class="btn-del-mini"><Trash2 :size="12" /></button>
                                  </div>
                                  <div v-if="!lesson.materials?.length" class="empty-mini-builder">Nenhum material de apoio adicionado.</div>
                                </div>

                                <div class="form-group-v2 full">
                                  <label>Nível da Aula</label>
                                  <select v-model="lesson.level">
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                  </select>
                                </div>
                              </div>
                              <div class="form-group-v2">
                                <label>Resumo da Aula</label>
                                <RichTextEditor v-model="lesson.description" />
                              </div>
                            </div>
                            <button type="button" @click="addLesson(mod)" class="btn-add-lesson-premium">+ Adicionar Nova Aula</button>
                          </div>
                        </div>
                      </div>
                      <div v-if="!editingItem.modules?.length" class="empty-lms-v2">
                        Nenhum módulo criado ainda. Comece adicionando o primeiro!
                      </div>
                    </div>
                  </template>

                  <!-- EQUIPE -->
                  <template v-if="activeTab === 'team'">
                    <div class="form-group-v2 full"><label>Nome Completo</label><input type="text" v-model="editingItem.name" class="input-hero-v2" required /></div>
                    <div class="form-row-v2">
                      <div class="form-group-v2"><label>E-mail</label><input type="email" v-model="editingItem.email" /></div>
                      <div class="form-group-v2">
                        <label>Cargo / Função</label>
                        <select v-model="editingItem.role">
                          <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.label }}</option>
                        </select>
                        <p class="role-desc-mini" v-if="editingItem.role">
                          {{ ROLES.find(r => r.id === editingItem.role)?.desc }}
                        </p>
                      </div>
                    </div>
                    <div class="form-group-v2 full"><label>Foto (Circular)</label><Base64ImageUploader v-model="editingItem.image" circular /></div>
                    <div class="bio-grid-triple">
                      <div class="bio-card"><label>Bio Institucional (Página Sobre)</label><RichTextEditor v-model="editingItem.bioInstitucional" /></div>
                      <div class="bio-card"><label>Bio Autor (Rodapé Artigos)</label><textarea v-model="editingItem.bioAuthor" rows="3" placeholder="Ex: Especialista em economia feminista e impacto..."></textarea></div>
                      <div class="bio-card"><label>Bio Instrutor (Trilhas)</label><textarea v-model="editingItem.bioInstructor" rows="3" placeholder="Ex: Sua guia técnica nesta jornada de aprendizado..."></textarea></div>
                    </div>
                  </template>

                  <!-- EDITORIAL -->
                  <template v-if="activeTab === 'posts'">
                    <div class="form-group-v2 full"><label>Título Principal</label><input type="text" v-model="editingItem.title" class="input-hero-v2" required /></div>
                    <div class="form-group-v2 full"><label>Subtítulo / Chamada</label><textarea v-model="editingItem.subtitle" rows="2" placeholder="Uma frase curta que resume o artigo..."></textarea></div>
                    
                    <div class="form-row-v2">
                      <div class="form-group-v2">
                        <label>Tipo de Conteúdo</label>
                        <select v-model="editingItem.type">
                          <option value="Artigo">Artigo</option>
                          <option value="Análise">Análise Técnica</option>
                          <option value="Notícia">Notícia / Reportagem</option>
                          <option value="Opinião">Opinião / Editorial</option>
                        </select>
                      </div>
                      <div class="form-group-v2">
                        <label>Autor(a)</label>
                        <select v-model="editingItem.authorId">
                          <option value="anne">Anne Dornelas (Principal)</option>
                          <option v-for="m in siteContent.team" :key="m.id" :value="m.id">{{ m.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group-v2 full">
                      <label>Categorização Temática</label>
                      <select v-model="editingItem.category">
                        <option value="Economia">Economia</option>
                        <option value="Gênero">Gênero</option>
                        <option value="Política">Política</option>
                        <option value="Terceiro Setor">Terceiro Setor</option>
                        <option value="Tecnologia">Tecnologia</option>
                      </select>
                    </div>

                    <div class="form-group-v2 full"><label>Capa do Artigo</label><Base64ImageUploader v-model="editingItem.image" /></div>
                    <div class="form-group-v2 full"><label>Resumo / Excerpt (Para a listagem)</label><textarea v-model="editingItem.excerpt" rows="3"></textarea></div>
                    <div class="form-group-v2 full"><label>Conteúdo Completo</label><RichTextEditor v-model="editingItem.content" /></div>
                    
                    <div class="form-group-v2 full">
                      <label>Tags / Hashtags (Separadas por vírgula)</label>
                      <input type="text" v-model="editingItem.tags" placeholder="Ex: economia, ri, impacto, mulheres" />
                    </div>

                    <div class="references-builder-v2 full">
                      <div class="lms-header-v2">
                        <h3>Referências Bibliográficas</h3>
                        <button type="button" @click="addReference" class="btn-ghost-v2 text-purple">+ Adicionar Referência</button>
                      </div>
                      <div v-for="(ref, rIdx) in editingItem.references" :key="rIdx" class="ref-item-v2">
                        <input type="text" v-model="ref.title" placeholder="Título da Obra/Relatório" />
                        <input type="text" v-model="ref.url" placeholder="Link (URL)" />
                        <button type="button" @click="editingItem.references.splice(rIdx, 1)" class="btn-del-mini"><Trash2 :size="14" /></button>
                      </div>
                    </div>
                  </template>

                  <!-- NEWSLETTER -->
                  <template v-if="activeTab === 'newsletters'">
                    <div class="newsletter-editor-layout">
                      <!-- EDITOR SIDE -->
                      <div class="nw-edit-pane">
                        <div class="form-group-v2 full">
                          <label>Identificador Interno (Título para o Arquivo)</label>
                          <input type="text" v-model="editingItem.title" required placeholder="Ex: Edição #42 - O Futuro da Economia" />
                        </div>
                        <div class="form-row-v2">
                          <div class="form-group-v2"><label>Assunto da Mensagem (E-mail)</label><input type="text" v-model="editingItem.subject" required placeholder="Ex: Novidades de Abril" /></div>
                          <div class="form-group-v2">
                            <label>Segmento da Audiência</label>
                            <select v-model="editingItem.recipients">
                              <option value="Todos os Inscritos">Todos os Inscritos</option>
                              <option value="Apenas Alunos Premium">Alunos Premium</option>
                              <option value="Equipe e Parceiros">Equipe e Parceiros</option>
                              <option value="Lista de Espera">Lista de Espera</option>
                            </select>
                          </div>
                        </div>

                        <div class="form-group-v2 full">
                          <label>Resumo / Chamada Curta (Preview do E-mail)</label>
                          <textarea v-model="editingItem.summary" rows="2" placeholder="Uma frase que aparece na lista de e-mails do usuário..."></textarea>
                        </div>

                        <div class="form-group-v2 full">
                          <div class="label-with-action">
                            <label>Conteúdo da Mensagem (Rich Text)</label>
                            <span class="status-badge-v2" :class="editingItem.status === 'Enviada' ? 'green' : 'orange'">{{ editingItem.status }}</span>
                          </div>
                          <RichTextEditor v-model="editingItem.content" />
                        </div>
                      </div>

                      <!-- PREVIEW SIDE -->
                      <div class="nw-preview-pane" :class="{ 'is-expanded': isPreviewExpanded }">
                        <div class="preview-header-label">
                          <span>Visualização em Tempo Real</span>
                          <button type="button" @click="isPreviewExpanded = !isPreviewExpanded" class="btn-preview-toggle">
                            <component :is="isPreviewExpanded ? X : ExternalLink" :size="14" />
                            {{ isPreviewExpanded ? 'Fechar Expandido' : 'Ver em Tela Cheia' }}
                          </button>
                        </div>
                        <div class="email-mockup-v2">
                          <div class="email-mock-header">
                            <div class="mock-top-bar">
                              <div class="mock-dots"><span class="m-dot red"></span><span class="m-dot yellow"></span><span class="m-dot green"></span></div>
                              <div class="mock-address">Para: {{ editingItem.recipients }}</div>
                            </div>
                            <div class="mock-subject">
                              <span class="subj-label">Assunto:</span> {{ editingItem.subject || '(Sem Assunto)' }}
                            </div>
                            <div class="mock-summary" v-if="editingItem.summary">
                              <span class="subj-label">Resumo:</span> {{ editingItem.summary }}
                            </div>
                          </div>
                          <div class="email-mock-body scroll-thin">
                            <div class="email-content-preview" v-html="editingItem.content || '<p class=\'text-soft\'>Comece a escrever para ver o preview aqui...</p>'"></div>
                            <div class="email-footer-preview">
                              <p>© 2025 Narrativa Política. Todos os direitos reservados.</p>
                              <p>Você recebeu este e-mail porque está inscrito em nossa lista.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="editingItem.status !== 'Enviada'" class="newsletter-action-box">
                      <p>Revise o conteúdo e o preview antes de realizar o disparo.</p>
                      <button type="button" @click="sendNewsletter" class="btn-primary-premium action-main-gradient">
                        <Zap :size="18" /> Disparar Newsletter Agora
                      </button>
                    </div>
                  </template>

                  <!-- CONFIGS -->
                  <template v-if="activeTab === 'settings'">
                    <div class="settings-grid-v2">
                      <!-- SECTION: GERAL & SEO -->
                      <section class="settings-section">
                        <div class="section-header-v2"><LayoutDashboard :size="18" /> <h3>Identidade e SEO</h3></div>
                        <div class="form-group-v2 full"><label>Nome do Site</label><input type="text" v-model="editingItem.siteName" /></div>
                        <div class="form-group-v2 full"><label>Tagline (Slogan)</label><input type="text" v-model="editingItem.siteTagline" /></div>
                        <div class="form-group-v2 full"><label>Descrição SEO (Google)</label><textarea v-model="editingItem.siteDescription" rows="3"></textarea></div>
                        <div class="form-group-v2 full"><label>Logo Principal</label><Base64ImageUploader v-model="editingItem.siteLogo" /></div>
                      </section>

                      <!-- SECTION: CONTATO E REDES -->
                      <section class="settings-section">
                        <div class="section-header-v2"><Mail :size="18" /> <h3>Contato e Social</h3></div>
                        <div class="form-group-v2 full"><label>E-mail de Contato Público</label><input type="email" v-model="editingItem.contactEmail" /></div>
                        <div class="form-group-v2 full"><label>Instagram (Link)</label><input type="text" v-model="editingItem.instagram" /></div>
                        <div class="form-group-v2 full"><label>LinkedIn (Link)</label><input type="text" v-model="editingItem.linkedin" /></div>
                      </section>

                      <!-- SECTION: FINANCEIRO E APOIO -->
                      <section class="settings-section">
                        <div class="section-header-v2"><Zap :size="18" /> <h3>Apoio e Financeiro</h3></div>
                        <div class="form-group-v2 full"><label>Chave PIX Oficial</label><input type="text" v-model="editingItem.pixKey" /></div>
                        <div class="form-group-v2 full"><label>QR Code para Doação (Screenshot)</label><Base64ImageUploader v-model="editingItem.pixQRCode" /></div>
                        <div class="form-group-v2 full"><label>Título do Bloco de Doação</label><input type="text" v-model="editingItem.donationTitle" /></div>
                        <div class="form-group-v2 full"><label>Texto de Chamada para Doação</label><textarea v-model="editingItem.donationText" rows="3"></textarea></div>
                      </section>

                      <!-- SECTION: SISTEMA -->
                      <section class="settings-section">
                        <div class="section-header-v2"><Cog :size="18" /> <h3>Preferências do Sistema</h3></div>
                        <div class="form-group-v2">
                          <label>Exibir Métricas na Home?</label>
                          <div class="toggle-group-v2">
                            <label class="toggle-v2">
                              <input type="checkbox" v-model="editingItem.showMetrics">
                              <span class="slider-v2"></span>
                            </label>
                            <span class="toggle-label-v2">{{ editingItem.showMetrics ? 'Sim, exibir números' : 'Ocultar' }}</span>
                          </div>
                        </div>
                        <div class="form-group-v2">
                          <label>Modo Manutenção?</label>
                          <div class="toggle-group-v2">
                            <label class="toggle-v2">
                              <input type="checkbox" v-model="editingItem.maintenanceMode">
                              <span class="slider-v2 red"></span>
                            </label>
                            <span class="toggle-label-v2">{{ editingItem.maintenanceMode ? 'SISTEMA OFFLINE' : 'Sistema Online' }}</span>
                          </div>
                        </div>
                      </section>
                    </div>
                  </template>

                  <!-- SOBRE MIM, BIBLIOTECA, SERVIÇOS -->
                  <template v-if="['library', 'services', 'projects', 'opportunities', 'about'].includes(activeTab)">
                    <!-- SOBRE MIM -->
                    <div v-if="activeTab === 'about'" class="form-grid-v2">
                      <div class="form-group-v2 full"><label>Missão</label><textarea v-model="editingItem.mission" rows="2"></textarea></div>
                      <div class="form-group-v2 full">
                        <label>Cargo / Função</label>
                        <select v-model="editingItem.role">
                          <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.label }}</option>
                        </select>
                        <p class="role-desc-mini" v-if="editingItem.role">
                          {{ ROLES.find(r => r.id === editingItem.role)?.desc }}
                        </p>
                      </div>
                      <div class="form-group-v2 full"><label>Foto Oficial</label><Base64ImageUploader v-model="editingItem.image" circular /></div>
                      
                      <div class="bio-grid-triple">
                        <div class="bio-card"><label>Bio Institucional (Página Sobre)</label><RichTextEditor v-model="editingItem.bioInstitucional" /></div>
                        <div class="bio-card"><label>Bio Autor (Rodapé Artigos)</label><textarea v-model="editingItem.bioAuthor" rows="3" placeholder="Resumo para rodapé de artigos..."></textarea></div>
                        <div class="bio-card"><label>Bio Instrutor (Trilhas)</label><textarea v-model="editingItem.bioInstructor" rows="3" placeholder="Resumo para página de cursos..."></textarea></div>
                      </div>
                    </div>

                    <!-- BIBLIOTECA -->
                    <div v-if="activeTab === 'library'" class="form-grid-v2">
                      <div class="form-row-v2">
                        <div class="form-group-v2"><label>Categoria</label><select v-model="editingItem.type"><option value="Dataset">Dataset</option><option value="Publicação">Publicação</option><option value="Infográfico">Infográfico</option><option value="Relatório">Relatório</option></select></div>
                        <div class="form-group-v2"><label>Data de Publicação</label><input type="date" v-model="editingItem.date" /></div>
                      </div>
                      <div class="form-group-v2 full"><label>Link Externo (Opcional)</label><input type="text" v-model="editingItem.link" placeholder="https://..." /></div>
                      <div class="form-group-v2 full"><label>Upload do Documento (PDF)</label><FileUploader v-model="editingItem.file" v-model:fileName="editingItem.fileName" /></div>
                      <div class="form-group-v2 full"><label>Descrição</label><RichTextEditor v-model="editingItem.description" /></div>
                      <div class="form-group-v2 full"><label>Capa/Imagem</label><Base64ImageUploader v-model="editingItem.image" /></div>
                    </div>

                    <!-- VAGAS -->
                    <div v-if="activeTab === 'opportunities'" class="form-grid-v2">
                      <div class="form-group-v2 full"><label>Título da Vaga / Oportunidade</label><input type="text" v-model="editingItem.title" class="input-hero-v2" required /></div>
                      <div class="form-row-v2">
                        <div class="form-group-v2"><label>Instituição / Organização</label><input type="text" v-model="editingItem.org" /></div>
                        <div class="form-group-v2"><label>Tipo</label><select v-model="editingItem.type"><option value="Vagas">Vaga</option><option value="Editais">Edital</option><option value="Bolsas">Bolsa</option><option value="CLT">CLT</option><option value="Consultoria">Consultoria</option></select></div>
                      </div>
                      <div class="form-row-v2">
                        <div class="form-group-v2"><label>Deadline (Prazo)</label><input type="text" v-model="editingItem.deadline" placeholder="ex: 30 de Abril de 2025" /></div>
                        <div class="form-group-v2"><label>Link de Acesso / Inscrição</label><input type="text" v-model="editingItem.link" placeholder="https://..." /></div>
                      </div>
                      <div class="form-row-v2">
                        <div class="form-group-v2"><label>Localização</label><input type="text" v-model="editingItem.location" placeholder="Ex: Remoto ou Recife, PE" /></div>
                        <div class="form-group-v2"><label>Área de Atuação</label><input type="text" v-model="editingItem.area" /></div>
                      </div>
                      <div class="form-group-v2 full"><label>Como funciona / Requisitos</label><textarea v-model="editingItem.requirements" rows="4" placeholder="Descreva os pré-requisitos e o processo de seleção..."></textarea></div>
                      <div class="form-group-v2 full"><label>Descrição Completa da Oportunidade</label><RichTextEditor v-model="editingItem.description" /></div>
                    </div>

                    <!-- PROJETOS E SERVIÇOS -->
                    <div v-if="['projects', 'services'].includes(activeTab)" class="form-grid-v2">
                      <div class="form-group-v2 full"><label>Título do {{ activeTab === 'services' ? 'Serviço' : 'Projeto' }}</label><input type="text" v-model="editingItem.title" class="input-hero-v2" required /></div>
                      
                      <div class="form-row-v2" v-if="activeTab === 'projects'">
                        <div class="form-group-v2">
                          <label>Categoria do Projeto</label>
                          <select v-model="editingItem.category">
                            <option value="Pesquisa Aplicada">Pesquisa Aplicada</option>
                            <option value="Advocacy">Advocacy</option>
                            <option value="Educação">Educação</option>
                            <option value="Políticas Públicas">Políticas Públicas</option>
                          </select>
                        </div>
                        <div class="form-group-v2">
                          <label>Status</label>
                          <select v-model="editingItem.status">
                            <option value="Em planejamento">Em planejamento</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Pausado">Pausado</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-row-v2">
                        <div class="form-group-v2"><label>Público-Alvo</label><input type="text" v-model="editingItem.targetAudience" placeholder="Ex: ONGs de pequeno porte, Mulheres líderes..." /></div>
                        <div class="form-group-v2"><label>Investimento / Valor</label><input type="text" v-model="editingItem.investment" placeholder="Ex: R$ 500,00 ou Sob Consulta" /></div>
                      </div>

                      <div class="form-group-v2 full" v-if="activeTab === 'projects'">
                        <label>Impacto Social e Objetivos (Resumo)</label>
                        <textarea v-model="editingItem.impact" rows="2" placeholder="Descreva o impacto mensurável..."></textarea>
                      </div>

                      <div class="form-group-v2 full" v-if="activeTab === 'projects'">
                        <label>Detalhamento de Impacto (Completo)</label>
                        <RichTextEditor v-model="editingItem.socialImpact" />
                      </div>

                      <div class="form-group-v2 full"><label>Descrição / História Completa</label><RichTextEditor v-model="editingItem.description" /></div>
                      <div class="form-group-v2 full"><label>Imagem de Capa</label><Base64ImageUploader v-model="editingItem.image" /></div>
                    </div>
                  </template>
                </div>

                <div class="editor-footer-v2">
                  <button type="button" @click="editingItem = null" class="btn-ghost-v2">Cancelar</button>
                  <button type="submit" class="btn-primary-premium action-main-gradient"><Zap :size="18" /> Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>

      <transition name="toast-pop">
        <div v-if="toast.show" class="toast-v2" :class="toast.type">
          <CheckCircle v-if="toast.type === 'success'" :size="18" />
          <AlertCircle v-else :size="18" />
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent, saveContent, logActivity, saveItemToSupabase, deleteItemFromSupabase } from '../store/content'
import { 
  FileText, Briefcase, Rocket, BookOpen, User, LogOut, 
  LayoutDashboard, Plus, Trash2, Edit3, ExternalLink, Mail, 
  CheckCircle, X, TrendingUp, Users, Download, Zap, ChevronRight,
  Search, AlertCircle, Cog, File, Database, Paperclip
} from 'lucide-vue-next'
import Base64ImageUploader from '../components/admin/Base64ImageUploader.vue'
import FileUploader from '../components/admin/FileUploader.vue'
import RichTextEditor from '../components/admin/RichTextEditor.vue'
import ImpactChart from '../components/ImpactChart.vue'

const router = useRouter()
const { logout, user } = useAuth()

const mainTabs = [
  { id: 'dashboard', label: 'Resumo', icon: LayoutDashboard },
  { id: 'newsletters', label: 'Newsletter', icon: Mail },
]
const contentTabs = [
  { id: 'posts', label: 'Editorial', icon: FileText },
  { id: 'paths', label: 'Trilhas', icon: BookOpen },
  { id: 'projects', label: 'Projetos', icon: Rocket },
  { id: 'services', label: 'Serviços', icon: Briefcase },
  { id: 'opportunities', label: 'Vagas', icon: ExternalLink },
  { id: 'library', label: 'Biblioteca', icon: Download },
]
const systemTabs = [
  { id: 'team', label: 'Equipe', icon: Users },
  { id: 'about', label: 'Sobre Mim', icon: User },
  { id: 'settings', label: 'Ajustes', icon: Cog }
]

const ROLES = [
  { id: 'Administradora', label: 'Administradora', desc: 'Acesso total a todas as áreas do ecossistema, incluindo gestão de equipe e configurações globais.' },
  { id: 'Editora-Chefe', label: 'Editora-Chefe', desc: 'Pode gerenciar todo o conteúdo (Artigos, Trilhas, Biblioteca, Projetos e Serviços) e Newsletters.' },
  { id: 'Autora', label: 'Autora', desc: 'Focada na criação de conteúdo para o Editorial e envio de Newsletters para a audiência.' },
  { id: 'Instrutora', label: 'Instrutora', desc: 'Responsável exclusiva pela criação e gestão pedagógica das Trilhas de aprendizado.' }
]

const TAB_ACCESS = {
  'Administradora': ['dashboard', 'newsletters', 'posts', 'paths', 'projects', 'services', 'opportunities', 'library', 'team', 'about', 'settings'],
  'Editora-Chefe': ['dashboard', 'newsletters', 'posts', 'paths', 'projects', 'services', 'opportunities', 'library'],
  'Autora': ['dashboard', 'newsletters', 'posts'],
  'Instrutora': ['dashboard', 'paths']
}

const allTabs = [...mainTabs, ...contentTabs, ...systemTabs]

const userProfile = computed(() => {
  // Anne é sempre Administradora se for o email dela
  if (user.value?.email === 'contatonarrativapolitica@gmail.com') return siteContent.about
  return siteContent.team?.find(m => m.email === user.value?.email) || siteContent.about
})

const userRole = computed(() => userProfile.value?.role || 'Autora')
const userRoleLabel = computed(() => userRole.value)

const filteredMainTabs = computed(() => mainTabs.filter(t => TAB_ACCESS[userRole.value]?.includes(t.id)))
const filteredContentTabs = computed(() => contentTabs.filter(t => TAB_ACCESS[userRole.value]?.includes(t.id)))
const filteredSystemTabs = computed(() => systemTabs.filter(t => TAB_ACCESS[userRole.value]?.includes(t.id)))

const isAdmin = computed(() => userRole.value === 'Administradora')
const activeTab = ref('dashboard')

const setActiveTab = (id) => { 
  activeTab.value = id
  editingItem.value = null 
}

const currentTabLabel = computed(() => allTabs.find(t => t.id === activeTab.value)?.label)
const currentTabIcon = computed(() => allTabs.find(t => t.id === activeTab.value)?.icon || FileText)
const currentList = computed(() => siteContent[activeTab.value] || [])

const editingItem = ref(null)
const isNew = ref(false)
const toast = reactive({ show: false, message: '', type: 'success' })
const isPreviewExpanded = ref(false)
const expandedModule = ref(0)

const toggleModule = (idx) => expandedModule.value = expandedModule.value === idx ? -1 : idx
const showNewButton = computed(() => !editingItem.value && !['dashboard', 'about', 'settings'].includes(activeTab.value))

const showToast = (msg, type = 'success') => {
  toast.message = msg; toast.type = type; toast.show = true;
  setTimeout(() => toast.show = false, 3000)
}

const totalPublished = computed(() => (siteContent.posts?.length || 0) + (siteContent.services?.length || 0))
const stats = computed(() => [
  { label: 'Inscritos', value: siteContent.subscribers?.length || 0, icon: Users, color: 'pink' },
  { label: 'Trilhas', value: siteContent.paths?.length || 0, icon: BookOpen, color: 'purple' },
  { label: 'Biblioteca', value: siteContent.library?.length || 0, icon: Download, color: 'blue' },
  { label: 'Status', value: 'On', icon: Zap, color: 'lime' }
])

const getActivityClass = (t) => ({ 'Edição': 'blue', 'Criação': 'green', 'Exclusão': 'red' }[t] || 'default')
const handleLogout = () => { logout(); router.push('/') }

const addLesson = (mod) => {
  if (!mod.lessons) mod.lessons = []
  mod.lessons.push({ 
    id: Date.now(), 
    title: 'Nova Aula', 
    multimedia: [], 
    materials: [], 
    description: '', 
    level: 'Iniciante' 
  })
}

const addMultimedia = (lesson) => {
  if (!lesson.multimedia) lesson.multimedia = []
  lesson.multimedia.push({ title: 'Novo Vídeo/Link', url: '', type: 'Video' })
}

const addMaterial = (lesson) => {
  if (!lesson.materials) lesson.materials = []
  lesson.materials.push({ title: 'Novo Material', url: '', type: 'PDF' })
}

const addReference = () => {
  if (!editingItem.value.references) editingItem.value.references = []
  editingItem.value.references.push({ title: '', url: '' })
}

const editItem = (tab, item) => {
  isNew.value = false
  // Garante que o item tenha todos os campos necessários para não quebrar o v-model
  const baseItem = JSON.parse(JSON.stringify(item))
  if (tab === 'newsletters') {
    baseItem.status = baseItem.status || 'Rascunho'
    baseItem.recipients = baseItem.recipients || 'Todos os Inscritos'
    baseItem.summary = baseItem.summary || ''
    baseItem.title = baseItem.title || baseItem.subject || ''
  }
  if (tab === 'library') {
    baseItem.description = baseItem.description || ''
    baseItem.link = baseItem.link || ''
    baseItem.fileName = baseItem.fileName || ''
  }
  if (tab === 'team' || tab === 'about') {
    baseItem.role = baseItem.role || 'Autora'
    baseItem.bioInstitucional = baseItem.bioInstitucional || ''
    baseItem.bioAuthor = baseItem.bioAuthor || ''
    baseItem.bioInstructor = baseItem.bioInstructor || ''
  }
  if (tab === 'posts') {
    baseItem.type = baseItem.type || 'Artigo'
    baseItem.subtitle = baseItem.subtitle || ''
    baseItem.authorId = baseItem.authorId || 'anne'
    baseItem.excerpt = baseItem.excerpt || ''
    baseItem.references = baseItem.references || []
    baseItem.tags = baseItem.tags || ''
  }
  if (tab === 'services' || tab === 'projects') {
    baseItem.category = baseItem.category || ''
    baseItem.status = baseItem.status || 'Em andamento'
    baseItem.socialImpact = baseItem.socialImpact || ''
    baseItem.targetAudience = baseItem.targetAudience || ''
    baseItem.investment = baseItem.investment || baseItem.price || ''
  }
  if (tab === 'opportunities') {
    baseItem.requirements = baseItem.requirements || ''
  }
  if (tab === 'paths') {
    baseItem.subtitle = baseItem.subtitle || ''
    baseItem.level = baseItem.level || 'Iniciante'
    baseItem.workload = baseItem.workload || ''
    baseItem.hasCertificate = baseItem.hasCertificate !== undefined ? baseItem.hasCertificate : true
    baseItem.modules = baseItem.modules || []
    baseItem.modules.forEach(m => {
      m.lessons?.forEach(l => {
        if (!l.multimedia) l.multimedia = []
        if (!l.materials) l.materials = []
      })
    })
  }
  if (tab === 'settings') {
    baseItem.siteName = baseItem.siteName || 'Narrativa Política'
    baseItem.siteTagline = baseItem.siteTagline || ''
    baseItem.siteDescription = baseItem.siteDescription || ''
    baseItem.contactEmail = baseItem.contactEmail || ''
    baseItem.instagram = baseItem.instagram || ''
    baseItem.linkedin = baseItem.linkedin || ''
    baseItem.donationTitle = baseItem.donationTitle || ''
    baseItem.donationText = baseItem.donationText || ''
    baseItem.pixKey = baseItem.pixKey || ''
    baseItem.pixQRCode = baseItem.pixQRCode || ''
    baseItem.showMetrics = baseItem.showMetrics !== undefined ? baseItem.showMetrics : true
    baseItem.maintenanceMode = baseItem.maintenanceMode !== undefined ? baseItem.maintenanceMode : false
  }
  editingItem.value = baseItem
  if (tab === 'paths') expandedModule.value = 0
}

const createNew = () => {
  isNew.value = true
  const base = { id: Date.now(), date: new Date().toISOString().split('T')[0] }
  const templates = {
    posts: { ...base, title: '', type: 'Artigo', subtitle: '', authorId: 'anne', content: '', category: 'Editorial', excerpt: '', references: [], tags: '', image: '' },
    newsletters: { ...base, title: '', subject: '', summary: '', content: '', recipients: 'Todos os Inscritos', status: 'Rascunho' },
    paths: { ...base, title: '', subtitle: '', category: 'Economia', level: 'Iniciante', workload: '', hasCertificate: true, description: '', modules: [], image: '' },
    team: { ...base, name: '', email: '', role: 'Autora', bioInstitucional: '', bioAuthor: '', bioInstructor: '', image: '' },
    library: { ...base, title: '', type: 'Dataset', link: '', description: '', fileName: '', file: '' },
    services: { ...base, title: '', investment: '', targetAudience: '', description: '', type: 'Mentoria', image: '' },
    projects: { ...base, title: '', category: '', status: 'Em andamento', socialImpact: '', investment: '', targetAudience: '', description: '', image: '', accentColor: 'pink' },
    opportunities: { ...base, title: '', org: '', type: 'Vagas', deadline: '', requirements: '', description: '', link: '', location: '', area: '' }
  }
  editingItem.value = templates[activeTab.value] || { ...base, title: '' }
}

const saveItem = async () => {
  if (!editingItem.value) return
  
  // 1. Salvar no Supabase primeiro
  const result = await saveItemToSupabase(activeTab.value, editingItem.value, isNew.value)
  
  if (!result.success) {
    showToast('Erro ao salvar no banco de dados.', 'error')
    return
  }

  // 2. Atualizar estado local
  if (activeTab.value === 'about') siteContent.about = { ...editingItem.value }
  else if (activeTab.value === 'settings') siteContent.settings = { ...editingItem.value }
  else {
    if (!siteContent[activeTab.value]) siteContent[activeTab.value] = []
    if (isNew.value) siteContent[activeTab.value].unshift({ ...editingItem.value })
    else {
      const idx = siteContent[activeTab.value].findIndex(i => i.id === editingItem.value.id)
      if (idx > -1) siteContent[activeTab.value].splice(idx, 1, { ...editingItem.value })
    }
  }
  
  saveContent() // Backup local
  logActivity(`${editingItem.value.title || editingItem.value.subject || 'Registro'} salvo.`, isNew.value ? 'Criação' : 'Edição')
  showToast('Sucesso!')
  editingItem.value = null
}

const deleteItem = async (tab, id) => {
  if (confirm('Deseja excluir permanentemente?')) {
    const result = await deleteItemFromSupabase(tab, id)
    
    if (!result.success) {
      showToast('Erro ao excluir do banco de dados.', 'error')
      return
    }

    siteContent[tab] = siteContent[tab].filter(i => i.id !== id)
    saveContent(); 
    logActivity(`Exclusão em ${tab}.`, 'Exclusão')
    showToast('Removido.', 'error')
  }
}

const sendNewsletter = () => {
  if (!editingItem.value.subject || !editingItem.value.content) {
    alert('Preencha o assunto e o conteúdo antes de enviar.')
    return
  }
  if (confirm(`Confirmar o disparo da newsletter para ${siteContent.subscribers?.length || 0} inscritos?`)) {
    editingItem.value.status = 'Enviada'
    editingItem.value.date = new Date().toLocaleDateString('pt-BR')
    saveItem()
    showToast('Newsletter disparada com sucesso!')
  }
}

const removeSubscriber = (email) => {
  siteContent.subscribers = siteContent.subscribers.filter(s => s.email !== email)
  saveContent(); showToast('Inscrito removido.')
}
</script>

<style scoped>
.admin-premium-wrapper { display: flex; min-height: 100vh; background: #F9FAFB; font-family: 'Inter', sans-serif; color: #111827; }
.admin-sidebar-v2 { width: 280px; background: #FFFFFF; border-right: 1px solid #E5E7EB; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; z-index: 100; }
.sidebar-brand { padding: 32px 24px; border-bottom: 1px solid #F3F4F6; }

/* BRANDING REFINED */
.logo-group-v2 { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-icon-compact-v2 { position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; }
.logo-np-v2 { font-weight: 900; font-size: 1rem; color: #1A1C2E; z-index: 2; position: relative; }
.decoration-v2 { position: absolute; width: 14px; height: 14px; border-radius: 3px; opacity: 0.85; }
.sq-1-v2 { background: #FF2D55; top: -2px; left: -2px; }
.sq-2-v2 { background: #8A2BE2; bottom: -2px; right: -2px; }
.logo-text-v2 { display: flex; flex-direction: column; line-height: 1; padding-left: 5px; }
.name-top-v2 { font-weight: 900; font-size: 1.1rem; color: #1A1C2E; }
.name-bottom-v2 { font-size: 0.5rem; text-transform: uppercase; letter-spacing: 3px; color: #FF2D55; font-weight: 800; }

.sidebar-menu-v2 { flex: 1; padding: 24px 16px; overflow-y: auto; }
.menu-group { margin-bottom: 24px; }
.group-label { display: block; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #9CA3AF; margin-bottom: 12px; padding-left: 12px; }
.menu-item-v2 { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; border: none; background: transparent; color: #4B5563; font-weight: 600; font-size: 0.9rem; border-radius: 12px; cursor: pointer; transition: 0.2s; text-align: left; }
.menu-item-v2:hover { background: #F3F4F6; }
.menu-item-v2.active { background: #111827; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.sidebar-footer-v2 { padding: 24px; border-top: 1px solid #E5E7EB; }
.user-profile-mini { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.avatar-v2 { width: 40px; height: 40px; border-radius: 50%; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; font-weight: 700; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.profile-gradient { background: linear-gradient(135deg, #FF2D55, #8A2BE2); color: white; }
.btn-logout-v2 { width: 100%; padding: 10px; border: 1px solid #FEE2E2; background: white; color: #EF4444; border-radius: 12px; font-weight: 700; cursor: pointer; }
.admin-main-hub { flex: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.hub-top-bar { height: 72px; background: white; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; }
.hub-path { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: #6B7280; }
.path-active { color: #111827; font-weight: 700; }
.btn-primary-premium { border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; color: white; transition: all 0.3s; }
.action-main-gradient { background: linear-gradient(135deg, #FF2D55, #8A2BE2); }
.action-main-gradient:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 45, 85, 0.2); }
.hub-scroll-content { flex: 1; padding: 40px; overflow-y: auto; }
.bento-hero-v2 { grid-column: span 4; background: linear-gradient(135deg, #111827 0%, #1e293b 100%); border-radius: 16px; padding: 56px; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.hero-text-v2 h1 { font-size: 2.8rem; font-weight: 900; color: #FFFFFF !important; margin-bottom: 16px; }
.hero-desc-white { color: rgba(255,255,255,0.9) !important; font-size: 1.1rem; max-width: 500px; }
.h-badge { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 100px; color: white; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; margin-top: 24px; width: fit-content; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.green { background: #10B981; }
.dot.blue { background: #3B82F6; }
.dashboard-v2-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat-card-premium { background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid #F3F4F6; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.stat-header-v2 { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.stat-icon-v2 { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.stat-icon-v2.pink { background: #FFF1F2; color: #FF2D55; }
.stat-icon-v2.purple { background: #F5F3FF; color: #8A2BE2; }
.stat-icon-v2.blue { background: #EFF6FF; color: #3B82F6; }
.stat-icon-v2.lime { background: #F7FEE7; color: #84CC16; }
.stat-value-v2 { font-size: 2rem; font-weight: 900; color: #111827; }
.bento-card-premium { background: #FFFFFF; border-radius: 16px; border: 1px solid #F3F4F6; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.02); }
.chart-span-2 { grid-column: span 2; }
.activity-span-1 { grid-column: span 2; }
.table-card-v2 { background: #FFFFFF; border-radius: 16px; border: 1px solid #F3F4F6; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.02); }
.saas-table { width: 100%; border-collapse: collapse; }
.saas-table th { background: #F9FAFB; padding: 16px 32px; text-align: left; font-size: 0.7rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; }
.saas-table td { padding: 20px 32px; border-bottom: 1px solid #F3F4F6; font-size: 0.9rem; color: #374151; }
.item-cell-v2 { display: flex; align-items: center; gap: 16px; }
.item-title-v2 { font-weight: 700; color: #111827; }
.item-img-mini { width: 44px; height: 44px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid #F3F4F6; }
.badge-v2 { padding: 6px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; background: #F3F4F6; color: #6B7280; }
.role-badge.administradora { background: #F5F3FF; color: #8A2BE2; }
.role-badge.editora-chefe { background: #EFF6FF; color: #3B82F6; }
.role-badge.autora { background: #FFF1F2; color: #FF2D55; }
.role-badge.instrutora { background: #F7FEE7; color: #84CC16; }
.action-group-v2 { display: flex; gap: 8px; justify-content: flex-end; }
.btn-icon-v2 { width: 36px; height: 36px; border-radius: 10px; border: none; background: #F9FAFB; color: #6B7280; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.btn-icon-v2:hover { background: #F1F5F9; color: #111827; }
/* EXECUTIVE DASHBOARD */
.dashboard-executive-v2 { display: flex; flex-direction: column; gap: 32px; }
.dashboard-welcome { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
.welcome-text h1 { font-size: 1.8rem; font-weight: 900; color: #111827; letter-spacing: -1px; margin-bottom: 4px; }
.welcome-text p { color: #6B7280; font-weight: 500; font-size: 0.95rem; }

.kpi-grid-refined { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.kpi-card-minimal { background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid #F3F4F6; display: flex; align-items: center; gap: 20px; position: relative; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.kpi-icon-v2 { width: 48px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.kpi-icon-v2.pink { background: #FFF1F2; color: #FF2D55; }
.kpi-icon-v2.purple { background: #F5F3FF; color: #8A2BE2; }
.kpi-icon-v2.blue { background: #EFF6FF; color: #3B82F6; }
.kpi-icon-v2.lime { background: #F7FEE7; color: #84CC16; }
.kpi-data { display: flex; flex-direction: column; flex: 1; }
.kpi-label { font-size: 0.75rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; }
.kpi-value { font-size: 1.5rem; font-weight: 900; color: #111827; }
.kpi-trend { position: absolute; top: 12px; right: 12px; font-size: 0.7rem; font-weight: 800; display: flex; align-items: center; gap: 2px; }
.kpi-trend.positive { color: #10B981; }

.dashboard-main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; }
.dashboard-card-refined { background: #FFFFFF; border-radius: 16px; border: 1px solid #F3F4F6; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.02); }
.d-card-header { margin-bottom: 20px; }
.d-card-header h3 { font-size: 0.95rem; font-weight: 800; color: #111827; margin-bottom: 4px; }
.d-card-header p { font-size: 0.8rem; color: #9CA3AF; font-weight: 500; }

.chart-wrapper-v2 { height: 350px; position: relative; }
.dashboard-side-column { display: flex; flex-direction: column; gap: 32px; }

.activity-list-refined { display: flex; flex-direction: column; gap: 16px; }
.activity-row-v2 { display: flex; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #F9FAFB; }
.activity-row-v2:last-child { border-bottom: none; padding-bottom: 0; }
.act-indicator { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
.act-indicator.blue { background: #3B82F6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
.act-indicator.green { background: #10B981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
.act-indicator.red { background: #EF4444; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1); }
.act-indicator.default { background: #9CA3AF; }
.act-title-v2 { font-size: 0.9rem; font-weight: 700; color: #111827; margin-bottom: 2px; }
.act-meta-v2 { font-size: 0.75rem; color: #9CA3AF; font-weight: 500; }

.shortcut-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.shortcut-btn { display: flex; align-items: center; gap: 10px; padding: 16px; background: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 12px; font-size: 0.85rem; font-weight: 700; color: #4B5563; cursor: pointer; transition: all 0.2s; }
.shortcut-btn:hover { background: #FFFFFF; border-color: #E2E8F0; color: #111827; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }

.premium-editor-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.1); backdrop-filter: blur(4px); z-index: 1000; display: flex; justify-content: flex-end; }
.editor-side-panel { width: 850px; background: white; height: 100%; display: flex; flex-direction: column; box-shadow: -10px 0 40px rgba(0,0,0,0.05); }
.editor-top-v2 { padding: 40px; border-bottom: 1px solid #F3F4F6; display: flex; justify-content: space-between; align-items: center; }
.editor-title-stack h2 { font-weight: 900; color: #111827; letter-spacing: -1px; }
.editor-form-v2 { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.form-scroll-area { flex: 1; padding: 40px; overflow-y: auto; max-width: 900px; margin: 0 auto; width: 100%; }
.form-grid-v2 { display: flex; flex-direction: column; gap: 0; }
.form-row-v2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 0; }
.form-group-v2 { margin-bottom: 24px; }
.form-group-v2 label { display: block; font-size: 0.8rem; font-weight: 800; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }

.label-with-action { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.label-with-action label { margin-bottom: 0; }
.drafts-list-v2 { display: flex; flex-direction: column; gap: 12px; }
.draft-row-v2 { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 12px; transition: 0.2s; }
.draft-row-v2:hover { border-color: #E2E8F0; background: #FFFFFF; transform: translateX(4px); }
.draft-info { display: flex; flex-direction: column; gap: 4px; }
.draft-title { font-weight: 700; color: #111827; font-size: 0.95rem; }
.draft-summary-preview { font-size: 0.8rem; color: #6B7280; margin: 4px 0 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.item-summary-mini { font-size: 0.75rem; color: #6B7280; margin: 4px 0 6px; font-weight: 500; }
.draft-meta { font-size: 0.75rem; color: #9CA3AF; font-weight: 600; }
.draft-actions { display: flex; gap: 8px; }
.empty-mini { padding: 32px; text-align: center; color: #9CA3AF; font-size: 0.85rem; font-weight: 600; border: 2px dashed #F3F4F6; border-radius: 12px; }

.status-badge-v2 { font-size: 0.65rem; font-weight: 900; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; }
.status-badge-v2.orange { background: #FFF7ED; color: #EA580C; border: 1px solid #FFEDD5; }
.status-badge-v2.green { background: #F0FDF4; color: #16A34A; border: 1px solid #DCFCE7; }

.newsletter-action-box { 
  margin-top: 32px; padding: 32px; background: #F8FAFC; border: 2px dashed #E2E8F0; border-radius: 20px; text-align: center;
}
.newsletter-action-box p { font-size: 0.9rem; color: #64748B; margin-bottom: 24px; font-weight: 600; }
.newsletter-action-box .btn-primary-premium { margin: 0 auto; width: fit-content; }

.input-hero-v2 { width: 100%; padding: 16px; font-size: 1.25rem; font-weight: 900; border: 2px solid #F3F4F6; border-radius: 12px; color: #111827; }
input, select, textarea { width: 100%; padding: 12px 14px; border: 2px solid #F3F4F6; border-radius: 12px; font-family: inherit; color: #111827; font-size: 0.9rem; }
.editor-footer-v2 { padding: 32px 40px; background: #F9FAFB; border-top: 1px solid #F3F4F6; display: flex; justify-content: center; gap: 16px; }
.btn-ghost-v2 { padding: 14px 28px; border-radius: 12px; border: none; background: transparent; color: #6B7280; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.btn-ghost-v2:hover { background: #F1F5F9; color: #111827; }
.lms-builder-v2 { background: #F9FAFB; padding: 32px; border-radius: 16px; border: 1px solid #E5E7EB; }
.accordion-card { background: white; border: 1px solid #F3F4F6; border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.01); }
.mod-handle-v2 { padding: 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
.input-flat-bold { border: none; background: transparent; font-size: 1.1rem; font-weight: 800; width: 100%; color: #111827; }
.accordion-icon { transition: 0.3s; }
.accordion-icon.rotated { transform: rotate(90deg); }
.module-content-area { padding: 0 20px 24px; }
.lms-builder-v2 { background: #F9FAFB; padding: 32px; border-radius: 20px; border: 1px solid #E5E7EB; margin-top: 32px; }
.lms-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.lms-title-stack h3 { font-size: 1.25rem; font-weight: 800; color: #111827; }
.lms-title-stack p { font-size: 0.85rem; color: #6B7280; }

.accordion-card-v2 { background: white; border: 1px solid #E5E7EB; border-radius: 16px; margin-bottom: 16px; overflow: hidden; transition: 0.2s; }
.accordion-card-v2:hover { border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.mod-handle-v3 { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: #FFF; }
.mod-info-v2 { display: flex; align-items: center; gap: 16px; flex: 1; }
.mod-tag-v2 { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; background: #F3F4F6; color: #6B7280; padding: 4px 10px; border-radius: 6px; white-space: nowrap; }
.input-flat-v2 { border: none; background: transparent; font-size: 1.1rem; font-weight: 800; color: #111827; width: 100%; outline: none; }
.mod-actions-v2 { display: flex; align-items: center; gap: 12px; }

.module-body-v2 { padding: 0 24px 24px; border-top: 1px solid #F3F4F6; background: #FAFBFC; }
.lessons-label-v2 { display: block; font-size: 0.75rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; margin: 24px 0 16px; }

.lesson-card-v2 { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.lesson-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.lesson-title-v2 { display: flex; align-items: center; gap: 12px; flex: 1; }
.lesson-num-v2 { width: 24px; height: 24px; border-radius: 6px; background: #111827; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
.lesson-title-v2 input { border: none; background: transparent; font-weight: 700; font-size: 1rem; width: 100%; outline: none; padding: 0; }
.lesson-grid-v2 { display: grid; grid-template-columns: 1fr 1fr 150px; gap: 16px; margin-bottom: 16px; }

.btn-add-lesson-premium { width: 100%; padding: 16px; border: 2px dashed #E5E7EB; border-radius: 12px; background: white; color: #6B7280; font-weight: 700; cursor: pointer; transition: 0.2s; }
.btn-add-lesson-premium:hover { border-color: #8A2BE2; color: #8A2BE2; background: #F5F3FF; }

.empty-lms-v2 { padding: 60px; text-align: center; color: #9CA3AF; font-weight: 600; border: 2px dashed #E5E7EB; border-radius: 16px; }

/* TOGGLE V2 */
.toggle-group-v2 { display: flex; align-items: center; gap: 12px; height: 48px; }
.toggle-v2 { position: relative; display: inline-block; width: 44px; height: 24px; }
.toggle-v2 input { opacity: 0; width: 0; height: 0; }
.slider-v2 { position: absolute; cursor: pointer; inset: 0; background-color: #E5E7EB; transition: .4s; border-radius: 34px; }
.slider-v2:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider-v2 { background-color: #10B981; }
input:checked + .slider-v2.red { background-color: #EF4444; }
input:checked + .slider-v2:before { transform: translateX(20px); }
.toggle-label-v2 { font-size: 0.9rem; font-weight: 600; color: #4B5563; }

/* SETTINGS SPECIFIC */
.settings-grid-v2 { display: flex; flex-direction: column; gap: 32px; }
.settings-section { background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.section-header-v2 { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #F3F4F6; }
.section-header-v2 h3 { font-size: 1.1rem; font-weight: 800; color: #111827; }
.section-header-v2 svg { color: #8A2BE2; }

.lms-lesson-item { padding: 24px; border: 1px solid #F3F4F6; border-radius: 12px; background: #FFF; margin-bottom: 16px; }
.btn-add-lesson-v2 { width: 100%; padding: 16px; border: 2px dashed #D1D5DB; border-radius: 12px; background: transparent; color: #9CA3AF; cursor: pointer; font-weight: 700; }
.references-builder-v2 { background: #F9FAFB; padding: 24px; border-radius: 16px; border: 1px solid #E5E7EB; margin-top: 24px; }
.ref-item-v2 { display: grid; grid-template-columns: 1fr 1fr 40px; gap: 12px; margin-bottom: 12px; align-items: center; }
.ref-item-v2 input { padding: 10px 14px; font-size: 0.85rem; }
.btn-del-mini { background: #FEF2F2; color: #EF4444; border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.bio-grid-triple { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 10px; }
.bio-card { background: #F9FAFB; padding: 24px; border-radius: 12px; border: 1px solid #E5E7EB; margin-bottom: 0; }
.role-desc-mini { font-size: 0.75rem; color: #8A2BE2; margin-top: 8px; font-weight: 600; line-height: 1.4; background: #F5F3FF; padding: 8px 12px; border-radius: 8px; border-left: 3px solid #8A2BE2; }

@media (min-width: 1200px) {
  .bio-grid-triple { grid-template-columns: 1fr; }
}

.toast-v2 { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); padding: 16px 32px; border-radius: 100px; background: #111827; color: white; display: flex; align-items: center; gap: 12px; font-weight: 700; z-index: 2000; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.mt-32 { margin-top: 32px; }
.card-header-v2 { padding: 24px 32px; border-bottom: 1px solid #F3F4F6; }
.card-header-v2 h3 { font-size: 1.1rem; font-weight: 800; color: #111827; }

/* NEWSLETTER DASHBOARD */
.newsletter-dashboard-v2 { display: flex; flex-direction: column; }
.nw-stats-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 24px; }
.nw-stat-card { background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #F3F4F6; box-shadow: 0 2px 12px rgba(0,0,0,0.02); }
.nw-stat-card.main { display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border-color: #E2E8F0; }
.nw-stat-card h3 { font-size: 0.8rem; font-weight: 800; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.nw-count { font-size: 2.5rem; font-weight: 900; color: #111827; margin-bottom: 4px; }
.nw-count-sm { font-size: 1.8rem; font-weight: 900; color: #111827; margin-bottom: 4px; }
.nw-stat-card p { font-size: 0.85rem; color: #9CA3AF; font-weight: 500; }

/* NEWSLETTER EDITOR LAYOUT */
.newsletter-editor-layout { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
.nw-preview-pane { position: sticky; top: 0; }
.preview-header-label { font-size: 0.75rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.email-mockup-v2 { background: white; border-radius: 20px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: 600px; display: flex; flex-direction: column; }
.email-mock-header { background: #F8FAFC; padding: 20px; border-bottom: 1px solid #E5E7EB; }
.mock-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.mock-dots { display: flex; gap: 6px; }
.m-dot { width: 8px; height: 8px; border-radius: 50%; }
.m-dot.red { background: #FF5F56; }
.m-dot.yellow { background: #FFBD2E; }
.m-dot.green { background: #27C93F; }
.mock-address { font-size: 0.7rem; color: #94A3B8; font-weight: 600; }
.mock-subject, .mock-summary { font-size: 0.85rem; color: #1E293B; font-weight: 700; margin-bottom: 4px; }
.subj-label { color: #94A3B8; font-weight: 600; }

.btn-preview-toggle { background: #F1F5F9; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; color: #64748B; transition: 0.2s; }
.btn-preview-toggle:hover { background: #E2E8F0; color: #111827; }

.nw-preview-pane.is-expanded {
  position: fixed; inset: 40px; z-index: 1100; background: white; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); padding: 40px;
}
.nw-preview-pane.is-expanded .email-mockup-v2 { height: 100%; border: none; box-shadow: none; }

.email-mock-body { flex: 1; padding: 24px; overflow-y: auto; background: white; }
.email-content-preview { font-size: 0.9rem; line-height: 1.6; color: #334155; }
.email-footer-preview { margin-top: 40px; padding-top: 24px; border-top: 1px solid #F1F5F9; text-align: center; }
.email-footer-preview p { font-size: 0.7rem; color: #94A3B8; margin-bottom: 4px; }

.scroll-thin::-webkit-scrollbar { width: 4px; }
.scroll-thin::-webkit-scrollbar-track { background: transparent; }
.scroll-thin::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }

/* LIBRARY DASHBOARD */
.library-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.lh-info h2 { font-size: 1.8rem; font-weight: 900; color: #111827; letter-spacing: -1px; margin-bottom: 4px; }
.lh-info p { color: #6B7280; font-weight: 500; }
.library-grid-v2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.lib-card-premium { background: #FFFFFF; border: 1px solid #F3F4F6; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; transition: all 0.3s; }
.lib-card-premium:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.04); border-color: #E2E8F0; }
.lib-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.lib-icon-box { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #F9FAFB; color: #6B7280; }
.lib-icon-box.dataset { background: #EFF6FF; color: #3B82F6; }
.lib-icon-box.publicação { background: #F5F3FF; color: #8A2BE2; }
.lib-badge-v2 { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; background: #F3F4F6; color: #6B7280; padding: 4px 10px; border-radius: 6px; }
.lib-card-body h3 { font-size: 1.1rem; font-weight: 800; color: #111827; margin-bottom: 8px; line-height: 1.3; }
.lib-card-body p { font-size: 0.9rem; color: #6B7280; line-height: 1.5; margin-bottom: 16px; flex: 1; }
.lib-file-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: #8A2BE2; background: #F5F3FF; padding: 6px 12px; border-radius: 8px; margin-bottom: 20px; width: fit-content; }
.lib-card-footer { display: flex; gap: 12px; border-top: 1px solid #F3F4F6; padding-top: 16px; }
.btn-ghost-v2.sm { padding: 8px 16px; font-size: 0.8rem; border-radius: 8px; }
.btn-ghost-v2.sm.del:hover { background: #FEF2F2; color: #EF4444; }

.empty-state-card-v2 { grid-column: 1 / -1; background: #FFFFFF; border: 2px dashed #E5E7EB; border-radius: 16px; padding: 60px; text-align: center; color: #9CA3AF; }
.empty-state-card-v2 p { margin-top: 16px; font-weight: 600; }

.item-subtitle-v2 { font-size: 0.8rem; color: #9CA3AF; font-weight: 500; display: block; }
.text-soft-v2 { color: #9CA3AF; font-size: 0.85rem; font-weight: 500; }

.tab-institutional-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; background: white; padding: 24px 32px; border: 1px solid #F3F4F6; border-radius: 16px; }
.t-header-info h2 { font-size: 1.4rem; font-weight: 900; color: #111827; letter-spacing: -0.5px; }
.t-header-info p { color: #9CA3AF; font-size: 0.85rem; font-weight: 500; }

.item-meta-stack { display: flex; gap: 8px; flex-wrap: wrap; }
.item-meta-stack .badge-v2 { background: #F8FAFC; border: 1px solid #E2E8F0; }

.lms-sub-section { margin-bottom: 24px; background: white; padding: 20px; border-radius: 12px; border: 1px solid #F3F4F6; }
.lms-sub-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.lms-sub-header label { margin-bottom: 0; font-size: 0.7rem; color: #9CA3AF; }

.item-builder-row { display: grid; grid-template-columns: 1fr 1fr 150px 40px; gap: 12px; margin-bottom: 8px; align-items: center; }
.input-minimal, .select-minimal { padding: 8px 12px; font-size: 0.8rem; border-width: 1px; }

.empty-mini-builder { font-size: 0.75rem; color: #9CA3AF; text-align: center; padding: 12px; border: 1px dashed #E5E7EB; border-radius: 8px; }

.form-group-v2 textarea { resize: vertical; min-height: 80px; }


.editor-slide-enter-active, .editor-slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.editor-slide-enter-from, .editor-slide-leave-to { transform: translateX(100%); }
.tab-institutional-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; background: white; padding: 24px 32px; border: 1px solid #F3F4F6; border-radius: 16px; }
.t-header-info h2 { font-size: 1.4rem; font-weight: 900; color: #111827; letter-spacing: -0.5px; }
.t-header-info p { color: #9CA3AF; font-size: 0.85rem; font-weight: 500; }
.item-meta-stack { display: flex; gap: 8px; flex-wrap: wrap; }
.item-meta-stack .badge-v2 { background: #F8FAFC; border: 1px solid #E2E8F0; }
.lms-sub-section { margin-bottom: 24px; background: white; padding: 20px; border-radius: 12px; border: 1px solid #F3F4F6; }
.lms-sub-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.lms-sub-header label { margin-bottom: 0; font-size: 0.7rem; color: #9CA3AF; }
.item-builder-row { display: grid; grid-template-columns: 1fr 1fr 150px 40px; gap: 12px; margin-bottom: 8px; align-items: center; }
.input-minimal, .select-minimal { padding: 8px 12px; font-size: 0.8rem; border-width: 1px; }
.empty-mini-builder { font-size: 0.75rem; color: #9CA3AF; text-align: center; padding: 12px; border: 1px dashed #E5E7EB; border-radius: 8px; }
.form-group-v2 textarea { resize: vertical; min-height: 80px; }
</style>
