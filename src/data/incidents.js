export const incidents = [
  {
    id: 1,
    title: { en: 'Full Production Network Outage', ru: 'Полный сетевой сбой продакшена' },
    date: '2025-04-11',
    year: 2025,
    severity: 'critical',
    category: 'infrastructure',
    impact: {
      en: 'Complete production outage: API Gateway, Order Service, Auth Service, ERP cash registers, monitoring — all unreachable. DNS resolution failed. Site returned 502 for all users.',
      ru: 'Полный отказ продакшена: API Gateway, Order Service, Auth Service, кассы ERP, мониторинг — всё недоступно. DNS-резолвинг упал. Сайт возвращал 502 всем пользователям.'
    },
    rca: {
      en: 'Network infrastructure failure — upstream connectivity lost since 11:00. No services accessible from external networks.',
      ru: 'Отказ сетевой инфраструктуры — потеря внешней связности с 11:00. Ни один сервис не доступен извне.'
    },
    resolution: {
      en: 'Network issue resolved by infrastructure team. Services recovered sequentially. Loyalty Service required additional restart after ERP system came back.',
      ru: 'Сетевая проблема решена инфраструктурной командой. Сервисы восстановлены последовательно. Loyalty Service потребовал дополнительного рестарта.'
    },
    prevention: {
      en: 'Implemented multi-path network redundancy monitoring. Added external synthetic checks independent of internal infrastructure.',
      ru: 'Внедрён мониторинг резервирования сетевых путей. Добавлены внешние синтетические проверки, независимые от внутренней инфраструктуры.'
    },
    mttr: '~4h',
    timelineSteps: [
      { phase: 'detection', duration: 30 },
      { phase: 'investigation', duration: 90 },
      { phase: 'resolution', duration: 120 },
    ],
  },
  {
    id: 2,
    title: { en: 'RabbitMQ Mass Disconnection — All Online Orders Stopped', ru: 'Массовый отказ RabbitMQ — все онлайн-заказы остановлены' },
    date: '2025-06-09',
    year: 2025,
    severity: 'critical',
    category: 'queue',
    impact: {
      en: 'Legacy RabbitMQ broker went down. 11 marketplace consumer services (payments, couriers, marketplaces) lost connection simultaneously. All online orders halted across all channels.',
      ru: 'Legacy-брокер RabbitMQ упал. 11 консьюмеров маркетплейсов (платежи, курьеры, маркетплейсы) потеряли соединение одновременно. Все онлайн-заказы остановлены.'
    },
    rca: {
      en: 'Legacy RabbitMQ (not in Kubernetes) node failure. Consumer services lacked reconnection logic — appeared running but were dead.',
      ru: 'Отказ ноды legacy RabbitMQ (вне Kubernetes). Консьюмеры не имели логики переподключения — выглядели рабочими, но были мертвы.'
    },
    resolution: {
      en: 'RabbitMQ recovered. Implemented health probes for all consumers with automatic restart on connection loss. Added queue depth monitoring.',
      ru: 'RabbitMQ восстановлен. Внедрены health probes для всех консьюмеров с автоматическим рестартом при потере соединения. Добавлен мониторинг глубины очередей.'
    },
    prevention: {
      en: 'Migrated consumers to Kubernetes with liveness probes. Implemented circuit breaker pattern for MQ connections.',
      ru: 'Консьюмеры мигрированы в Kubernetes с liveness probes. Реализован паттерн circuit breaker для MQ-соединений.'
    },
    mttr: '~2h',
    timelineSteps: [
      { phase: 'detection', duration: 10 },
      { phase: 'investigation', duration: 30 },
      { phase: 'resolution', duration: 80 },
    ],
  },
  {
    id: 3,
    title: { en: 'Auth Service Cascading Failure — Platform-wide Outage', ru: 'Каскадный отказ Auth Service — сбой всей платформы' },
    date: '2025-01-30',
    year: 2025,
    severity: 'critical',
    category: 'auth',
    impact: {
      en: 'Auth service (Keycloak) returning 500 errors on prod. Partner orders stopped. Users mass-reported inability to load loyalty cards, being logged out with no way to re-authenticate.',
      ru: 'Auth Service (Keycloak) возвращал 500 на проде. Партнёрские заказы остановлены. Массовые обращения пользователей — карты лояльности не загружаются, сессии сброшены.'
    },
    rca: {
      en: 'PostgreSQL connection pool exhaustion in Auth Service. Under load, all connections consumed with no backpressure, causing 500 errors on token endpoint.',
      ru: 'Исчерпание пула соединений PostgreSQL в Auth Service. Под нагрузкой все соединения заняты без backpressure, что вызвало 500 на endpoint токенов.'
    },
    resolution: {
      en: 'Fixed DB connection pool limits. Added pool utilization monitoring with alerting at 80% threshold.',
      ru: 'Исправлены лимиты пула соединений БД. Добавлен мониторинг утилизации пула с алертингом на пороге 80%.'
    },
    prevention: {
      en: 'Implemented connection pool metrics in Prometheus. Added graceful degradation — services cache auth tokens locally.',
      ru: 'Метрики пула соединений экспортируются в Prometheus. Добавлена graceful degradation — сервисы кешируют токены локально.'
    },
    mttr: '~52min',
    timelineSteps: [
      { phase: 'detection', duration: 5 },
      { phase: 'investigation', duration: 20 },
      { phase: 'resolution', duration: 27 },
    ],
  },
  {
    id: 4,
    title: { en: 'Product Service Pod Starvation — Bot Traffic DDoS', ru: 'Голодание подов Product Service — DDoS бот-трафиком' },
    date: '2025-03-04',
    year: 2025,
    severity: 'critical',
    category: 'performance',
    impact: {
      en: 'Marketing-purchased bot traffic caused 4x request spike (45→200 rps). Product Service workers exhausted, cities endpoint returning 500. Delivery completely broken for 12+ hours.',
      ru: 'Купленный маркетингом бот-трафик вызвал 4-кратный скачок запросов (45→200 rps). Воркеры Product Service исчерпаны, endpoint городов возвращал 500. Доставка сломана 12+ часов.'
    },
    rca: {
      en: 'Insufficient workers (5 per replica) combined with unoptimized MySQL geo-queries (ST_Distance/ST_Within). Workers blocked on slow queries, couldn\'t recover even after restarts.',
      ru: 'Недостаточно воркеров (5 на реплику) в сочетании с неоптимизированными гео-запросами MySQL (ST_Distance/ST_Within). Воркеры блокировались на медленных запросах.'
    },
    resolution: {
      en: 'Split into 3 deployment groups isolating internal traffic. Added 1-day cache for cities data. Implemented spatial indexes for geo-queries. p99 latency: 20s → <1s.',
      ru: 'Разделение на 3 группы деплоя с изоляцией внутреннего трафика. Кеш городов на 1 день. Пространственные индексы для гео-запросов. p99: 20с → <1с.'
    },
    prevention: {
      en: 'Rate limiting on public endpoints. Traffic source labeling in metrics. Capacity planning reviews before marketing campaigns.',
      ru: 'Rate limiting на публичных endpoint-ах. Маркировка источников трафика в метриках. Ревью capacity planning перед маркетинговыми кампаниями.'
    },
    mttr: '~12h',
    timelineSteps: [
      { phase: 'detection', duration: 60 },
      { phase: 'investigation', duration: 180 },
      { phase: 'resolution', duration: 480 },
    ],
  },
  {
    id: 5,
    title: { en: 'Redis OOM Crisis — Delivery & Auth Cascade', ru: 'Redis OOM кризис — каскад Delivery и Auth' },
    date: '2025-04-26',
    year: 2025,
    severity: 'critical',
    category: 'database',
    impact: {
      en: 'Redis OOM errors recurring daily after cache TTL expiration. All keys re-populated simultaneously exceeding maxmemory. Delivery service degraded every afternoon during business hours.',
      ru: 'Ежедневные OOM ошибки Redis после истечения TTL кеша. Все ключи пересоздавались одновременно, превышая maxmemory. Delivery сервис деградировал каждый день.'
    },
    rca: {
      en: 'Eviction policy set to "noeviction" — Redis refused writes when full instead of evicting old keys. maxmemory too low for the cities cache dataset after TTL-based hotfix increased caching.',
      ru: 'Политика вытеснения "noeviction" — Redis отказывал в записи при заполнении вместо вытеснения старых ключей. maxmemory слишком мал для кеша городов после хотфикса.'
    },
    resolution: {
      en: 'Changed eviction policy to allkeys-lru. Increased maxmemory. Implemented staggered cache warming to prevent thundering herd.',
      ru: 'Изменена политика вытеснения на allkeys-lru. Увеличен maxmemory. Реализовано поэтапное прогревание кеша для предотвращения thundering herd.'
    },
    prevention: {
      en: 'Added Redis memory utilization monitoring with alerting at 70%. Implemented cache TTL jitter to prevent simultaneous expiration.',
      ru: 'Добавлен мониторинг утилизации памяти Redis с алертингом на 70%. TTL jitter для предотвращения одновременного истечения.'
    },
    mttr: '~10h (initial), recurring daily until fix',
    timelineSteps: [
      { phase: 'detection', duration: 120 },
      { phase: 'investigation', duration: 240 },
      { phase: 'resolution', duration: 240 },
    ],
  },
  {
    id: 6,
    title: { en: 'HAProxy/Percona Crash — Payments & Orders Down', ru: 'Падение HAProxy/Percona — платежи и заказы недоступны' },
    date: '2025-04-24',
    year: 2025,
    severity: 'critical',
    category: 'database',
    impact: {
      en: 'HAProxy proxy for Percona (MySQL) crashed. All MySQL-dependent services affected: payments (Yookassa, YandexSplit), Loyalty, orders. Users unable to pay or place orders. Queue backlogs >1K messages.',
      ru: 'HAProxy прокси для Percona (MySQL) упал. Все MySQL-зависимые сервисы затронуты: платежи (Yookassa, YandexSplit), Loyalty, заказы. Очереди >1K сообщений.'
    },
    rca: {
      en: 'HAProxy single point of failure before Percona cluster. No redundancy or automatic failover configured for the proxy layer.',
      ru: 'HAProxy — единая точка отказа перед Percona-кластером. Нет резервирования или автоматического failover для прокси-слоя.'
    },
    resolution: {
      en: 'HAProxy restarted. Initiated crisis review of database proxy architecture. Planned migration to Percona Operator with built-in HA proxy.',
      ru: 'HAProxy перезапущен. Инициирован кризисный обзор архитектуры прокси БД. Запланирована миграция на Percona Operator с встроенным HA прокси.'
    },
    prevention: {
      en: 'HAProxy health monitoring added. DB query optimization for hot paths. Connection pool tuning across services.',
      ru: 'Добавлен мониторинг здоровья HAProxy. Оптимизация запросов БД для горячих путей. Тюнинг пулов соединений.'
    },
    mttr: '~1h 5min',
    timelineSteps: [
      { phase: 'detection', duration: 5 },
      { phase: 'investigation', duration: 15 },
      { phase: 'resolution', duration: 45 },
    ],
  },
  {
    id: 7,
    title: { en: 'Promotional Traffic Overload — Sustained Degradation', ru: 'Перегрузка промо-трафиком — устойчивая деградация' },
    date: '2025-10-15',
    year: 2025,
    severity: 'critical',
    category: 'performance',
    impact: {
      en: 'Monthly 30%-off promotion doubled traffic. All major services degraded: API Gateway, monitoring, Order Service. Site and mobile either very slow or erroring. Cluster resources fully exhausted.',
      ru: 'Ежемесячная акция "скидка 30%" удвоила трафик. Все основные сервисы деградировали. Сайт и мобильное приложение работали крайне медленно или с ошибками.'
    },
    rca: {
      en: 'No auto-scaling configured. Cluster resource limits reached with no headroom for traffic spikes. Monthly promotional pattern not accounted for in capacity planning.',
      ru: 'Автоскейлинг не настроен. Лимиты ресурсов кластера достигнуты без запаса для скачков трафика. Ежемесячный промо-паттерн не учтён в планировании ёмкости.'
    },
    resolution: {
      en: 'Increased cache TTLs (5→20min, auth 5→30min). Stopped advertising to reduce load. Cluster migration and resource expansion performed over weekend.',
      ru: 'Увеличены TTL кешей (5→20мин, auth 5→30мин). Реклама остановлена. Миграция кластера и расширение ресурсов выполнены за выходные.'
    },
    prevention: {
      en: 'Implemented HPA (Horizontal Pod Autoscaler) for critical services. Created promotional traffic playbook with pre-scaling procedures.',
      ru: 'Внедрён HPA для критичных сервисов. Создан playbook для промо-трафика с процедурами предварительного масштабирования.'
    },
    mttr: '~5h (degraded), full fix over weekend',
    timelineSteps: [
      { phase: 'detection', duration: 15 },
      { phase: 'investigation', duration: 60 },
      { phase: 'resolution', duration: 225 },
    ],
  },
  {
    id: 8,
    title: { en: 'SIGSEGV / Bus Error — Marketplace Services Core Dump', ru: 'SIGSEGV / Bus Error — Core Dump сервисов маркетплейсов' },
    date: '2025-06-17',
    year: 2025,
    severity: 'major',
    category: 'deployment',
    impact: {
      en: 'Multiple marketplace integration services crashed with "Bus error (core dumped)" — first occurrence of this error. Two marketplace channels completely down on production.',
      ru: 'Несколько сервисов интеграции с маркетплейсами упали с "Bus error (core dumped)". Два канала маркетплейсов полностью недоступны на продакшене.'
    },
    rca: {
      en: 'Binary/memory corruption in container runtime after deployment. Suspected shared memory issue in container orchestration layer.',
      ru: 'Повреждение бинарных файлов/памяти в runtime контейнера после деплоя. Предполагаемая проблема shared memory в оркестрации.'
    },
    resolution: {
      en: 'Full redeployment of all affected services. Build artifacts validated and re-pushed.',
      ru: 'Полный передеплой всех затронутых сервисов. Артефакты сборки провалидированы и перезалиты.'
    },
    prevention: {
      en: 'Added container image integrity checks in CI/CD. Implemented canary deployments for marketplace services.',
      ru: 'Добавлены проверки целостности образов контейнеров в CI/CD. Внедрены canary-деплои для сервисов маркетплейсов.'
    },
    mttr: '~4h',
    timelineSteps: [
      { phase: 'detection', duration: 15 },
      { phase: 'investigation', duration: 120 },
      { phase: 'resolution', duration: 105 },
    ],
  },
  {
    id: 9,
    title: { en: 'CronJob Silent Failure — Marketplace Revenue Drop', ru: 'Тихий отказ CronJob — падение выручки маркетплейса' },
    date: '2025-07-14',
    year: 2025,
    severity: 'major',
    category: 'infrastructure',
    impact: {
      en: 'Stock cache CronJob for marketplace channel stopped executing silently. Failed 6 times then Kubernetes stopped scheduling it. Sales dropped on the channel — went unnoticed over the weekend.',
      ru: 'CronJob кеша остатков для маркетплейса тихо остановился. 6 неудачных запусков — Kubernetes прекратил планирование. Продажи канала упали — не замечено за выходные.'
    },
    rca: {
      en: 'Kubernetes BackoffLimit reached after 6 failures. No alerting on CronJob last successful run time. Weekend gap in monitoring attention.',
      ru: 'Достигнут BackoffLimit Kubernetes после 6 отказов. Нет алертинга на время последнего успешного запуска CronJob. Выходные без внимания к мониторингу.'
    },
    resolution: {
      en: 'CronJob manually restarted. Implemented last-run-time monitoring for all CronJobs with alerting when execution gap exceeds 2x normal interval.',
      ru: 'CronJob перезапущен вручную. Внедрён мониторинг времени последнего запуска всех CronJob с алертингом при превышении 2x нормального интервала.'
    },
    prevention: {
      en: 'Created CronJob dashboard with execution history. Added PagerDuty integration for business-critical scheduled jobs.',
      ru: 'Создан дашборд CronJob с историей запусков. Добавлена интеграция с PagerDuty для бизнес-критичных джобов.'
    },
    mttr: '~2 days (delayed detection)',
    timelineSteps: [
      { phase: 'detection', duration: 2880 },
      { phase: 'investigation', duration: 30 },
      { phase: 'resolution', duration: 15 },
    ],
  },
  {
    id: 10,
    title: { en: 'Redis Data Loss — Customer Orders Lost', ru: 'Потеря данных Redis — утрата заказов клиентов' },
    date: '2025-08-04',
    year: 2025,
    severity: 'critical',
    category: 'database',
    impact: {
      en: 'During Redis cluster failure, order data stored in Redis was permanently lost. Manual recovery of order information required over multiple days.',
      ru: 'При отказе Redis-кластера данные заказов, хранившиеся в Redis, были безвозвратно потеряны. Ручное восстановление заняло несколько дней.'
    },
    rca: {
      en: 'Redis used for non-cache critical data (order state) without persistence or backup strategy. No RDB/AOF configured for order-related keys.',
      ru: 'Redis использовался для критичных данных (состояние заказов) без персистенции и стратегии бэкапов. RDB/AOF не настроены для ключей заказов.'
    },
    resolution: {
      en: 'Manual data restoration from application logs and database cross-references. Implemented Redis persistence (AOF) for order-related namespaces.',
      ru: 'Ручное восстановление данных из логов приложений и перекрёстных ссылок в БД. Внедрена персистенция Redis (AOF) для namespace заказов.'
    },
    prevention: {
      en: 'Architectural review: critical state moved to MySQL with Redis as cache-only layer. Implemented Redis backup strategy with hourly snapshots.',
      ru: 'Архитектурный обзор: критичное состояние перенесено в MySQL, Redis только как кеш. Стратегия бэкапов Redis с часовыми снэпшотами.'
    },
    mttr: 'Multiple days',
    timelineSteps: [
      { phase: 'detection', duration: 60 },
      { phase: 'investigation', duration: 480 },
      { phase: 'resolution', duration: 4320 },
    ],
  },
  {
    id: 11,
    title: { en: 'API Gateway Memory Leak — Event Loop Blocking', ru: 'Утечка памяти API Gateway — блокировка Event Loop' },
    date: '2025-02-14',
    year: 2025,
    severity: 'critical',
    category: 'performance',
    impact: {
      en: 'API Gateway consumed 4x normal memory. Event loop lag reached 10,347 seconds. All API responses >1.5s. Site completely down, mobile app severely degraded.',
      ru: 'API Gateway потреблял 4x нормального объёма памяти. Задержка event loop достигла 10 347 секунд. Все API-ответы >1.5с. Сайт полностью недоступен.'
    },
    rca: {
      en: 'Memory leak in API Gateway (Node.js BFF) causing event loop blocking. Upstream services (Order, Product) also slow, compounding the cascading failure.',
      ru: 'Утечка памяти в API Gateway (Node.js BFF), вызывающая блокировку event loop. Upstream-сервисы тоже замедлились, усугубляя каскадный отказ.'
    },
    resolution: {
      en: 'Doubled API Gateway resources. Identified and fixed memory leak in response caching layer. Implemented memory limit alerts.',
      ru: 'Ресурсы API Gateway удвоены. Найдена и исправлена утечка памяти в слое кеширования ответов. Добавлены алерты на лимиты памяти.'
    },
    prevention: {
      en: 'Added Node.js heap metrics to Prometheus. Configured automatic pod restart on memory threshold. Implemented load shedding.',
      ru: 'Метрики heap Node.js в Prometheus. Автоматический рестарт подов по порогу памяти. Реализован load shedding.'
    },
    mttr: '~1h (recurred next day)',
    timelineSteps: [
      { phase: 'detection', duration: 10 },
      { phase: 'investigation', duration: 25 },
      { phase: 'resolution', duration: 25 },
    ],
  },
  {
    id: 12,
    title: { en: 'Order Service CPU Overload — 5x Traffic Spike', ru: 'Перегрузка CPU Order Service — 5x скачок трафика' },
    date: '2026-03-12',
    year: 2026,
    severity: 'critical',
    category: 'performance',
    impact: {
      en: 'Order Service request volume jumped from 500 to 2500 rps. CPU hit limits, returning mass 499 errors. Cart and checkout completely broken. Payment service also affected.',
      ru: 'Объём запросов Order Service вырос с 500 до 2500 rps. CPU достиг лимитов, массовые 499 ошибки. Корзина и чекаут полностью сломаны.'
    },
    rca: {
      en: 'Evening traffic spike (5x normal). CPU limits set too low for peak traffic. Compounded by disk issues and WAF misconfiguration blocking internal auth traffic.',
      ru: 'Вечерний скачок трафика (5x нормы). CPU лимиты слишком низкие для пиковой нагрузки. Усугублено проблемами с диском и WAF, блокирующим внутренний auth-трафик.'
    },
    resolution: {
      en: 'Doubled Order Service CPU limits. Fixed WAF rules for internal traffic. Resolved disk space issues.',
      ru: 'CPU лимиты Order Service удвоены. Исправлены правила WAF для внутреннего трафика. Решены проблемы с дисковым пространством.'
    },
    prevention: {
      en: 'Implemented VPA recommendations for CPU/memory. Added traffic anomaly detection alerts. WAF rule review process established.',
      ru: 'Внедрены VPA-рекомендации для CPU/памяти. Алерты на аномалии трафика. Установлен процесс ревью правил WAF.'
    },
    mttr: '~3h',
    timelineSteps: [
      { phase: 'detection', duration: 15 },
      { phase: 'investigation', duration: 45 },
      { phase: 'resolution', duration: 120 },
    ],
  },
  {
    id: 13,
    title: { en: 'Grafana Production Crashes (Recurring)', ru: 'Падения Grafana на продакшене (регулярные)' },
    date: '2025-02-27',
    year: 2025,
    severity: 'major',
    category: 'monitoring',
    impact: {
      en: 'Grafana returning 503 during production incidents — a meta-incident. 25+ separate outages recorded. Teams unable to diagnose issues: "Can\'t check monitoring because there\'s no Grafana."',
      ru: 'Grafana возвращала 503 во время инцидентов на проде — мета-инцидент. 25+ отдельных отказов. Команды не могли диагностировать проблемы.'
    },
    rca: {
      en: 'Grafana shared infrastructure with production services. HAProxy before Percona failures cascaded to monitoring. Resource exhaustion during the times monitoring was needed most.',
      ru: 'Grafana делила инфраструктуру с продакшен-сервисами. Отказы HAProxy/Percona каскадировали на мониторинг. Исчерпание ресурсов когда мониторинг нужен больше всего.'
    },
    resolution: {
      en: 'Separated monitoring stack onto dedicated nodes with independent resource allocation. Implemented Grafana HA with multiple replicas.',
      ru: 'Стек мониторинга вынесен на выделенные ноды с независимым выделением ресурсов. Внедрён Grafana HA с несколькими репликами.'
    },
    prevention: {
      en: 'Monitoring infrastructure isolated from production workloads. Added uptime monitoring for Grafana itself via external checks.',
      ru: 'Инфраструктура мониторинга изолирована от продакшен-нагрузок. Мониторинг доступности самой Grafana через внешние проверки.'
    },
    mttr: '30min-3h per occurrence',
    timelineSteps: [
      { phase: 'detection', duration: 5 },
      { phase: 'investigation', duration: 10 },
      { phase: 'resolution', duration: 30 },
    ],
  },
  {
    id: 14,
    title: { en: 'Delivery Service DB Unreachable — Network Routing', ru: 'БД Delivery Service недоступна — сетевая маршрутизация' },
    date: '2025-09-09',
    year: 2025,
    severity: 'critical',
    category: 'infrastructure',
    impact: {
      en: 'Delivery Service returning 500 with "No route to host" for database. Cart broken on mobile app and site — users unable to place orders for ~4 hours.',
      ru: 'Delivery Service возвращал 500 с "No route to host" для БД. Корзина сломана в МП и на сайте — пользователи не могли оформить заказ ~4 часа.'
    },
    rca: {
      en: 'Network routing issue — database host unreachable at network level. Complicated by responsible administrator being on vacation.',
      ru: 'Проблема сетевой маршрутизации — хост БД недоступен на сетевом уровне. Осложнено отпуском ответственного администратора.'
    },
    resolution: {
      en: 'Physical investigation at the office identified network routing issue. Fixed by network team.',
      ru: 'Физическое расследование в офисе выявило проблему маршрутизации. Исправлено сетевой командой.'
    },
    prevention: {
      en: 'On-call rotation established for network team. Database connectivity monitoring with multi-path checks.',
      ru: 'Установлена ротация дежурств сетевой команды. Мониторинг связности БД с проверками по нескольким путям.'
    },
    mttr: '~4h',
    timelineSteps: [
      { phase: 'detection', duration: 15 },
      { phase: 'investigation', duration: 120 },
      { phase: 'resolution', duration: 105 },
    ],
  },
  {
    id: 15,
    title: { en: 'Session Wipe — Mass User Logouts', ru: 'Сброс сессий — массовый разлогин пользователей' },
    date: '2025-12-10',
    year: 2025,
    severity: 'critical',
    category: 'auth',
    impact: {
      en: 'All user sessions wiped — every user logged out simultaneously. Massive spike in re-authentication requests overwhelmed Auth Service.',
      ru: 'Все сессии пользователей сброшены — одновременный разлогин всех пользователей. Массовый всплеск переаутентификации перегрузил Auth Service.'
    },
    rca: {
      en: 'Auth Service incident caused session store to be cleared. Previously only signature validation was performed, not full session validation.',
      ru: 'Инцидент Auth Service вызвал очистку хранилища сессий. Ранее выполнялась только проверка подписи, а не полная валидация сессии.'
    },
    resolution: {
      en: 'Users re-authenticated. Added proper session validation layer. Implemented session store backup and recovery procedures.',
      ru: 'Пользователи переаутентифицированы. Добавлен полноценный слой валидации сессий. Внедрены процедуры бэкапа и восстановления хранилища сессий.'
    },
    prevention: {
      en: 'Session store now replicated across AZs. Added gradual session invalidation instead of bulk wipe.',
      ru: 'Хранилище сессий реплицируется. Добавлена постепенная инвалидация сессий вместо массового сброса.'
    },
    mttr: '~2h',
    timelineSteps: [
      { phase: 'detection', duration: 5 },
      { phase: 'investigation', duration: 30 },
      { phase: 'resolution', duration: 85 },
    ],
  },
]
