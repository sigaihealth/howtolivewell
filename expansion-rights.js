// Original U.S.-focused guidance. Links were reviewed in October 2026.
// Procedures, eligibility, and deadlines may change; each card points readers to the current source.

export const expansionRightsSources = [
  { id: 'digital-ftc-passwords', name: 'FTC: Protect your personal information', url: 'https://consumer.ftc.gov/articles/protect-your-personal-information-hackers-and-scammers' },
  { id: 'digital-ftc-mfa', name: 'FTC: Use two-factor authentication', url: 'https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts' },
  { id: 'digital-ftc-phone', name: 'FTC: Protect your phone', url: 'https://consumer.ftc.gov/articles/how-protect-your-phone-hackers' },
  { id: 'digital-ftc-phishing', name: 'FTC: Recognize and avoid phishing', url: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams' },
  { id: 'digital-ftc-router', name: 'FTC: Secure your home Wi-Fi', url: 'https://consumer.ftc.gov/articles/how-secure-your-home-wi-fi-network' },
  { id: 'digital-ftc-privacy', name: 'FTC: Website and app privacy', url: 'https://consumer.ftc.gov/articles/how-websites-and-apps-collect-and-use-your-information' },
  { id: 'digital-ftc-public-wifi', name: 'FTC: Public Wi-Fi safety', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know' },
  { id: 'digital-ftc-breach', name: 'FTC: What to do after a data breach', url: 'https://consumer.ftc.gov/media/79862' },
  { id: 'digital-idtheft', name: 'FTC: Data breach recovery guide', url: 'https://www.identitytheft.gov/DataBreach' },
  { id: 'digital-ftc-recovery', name: 'FTC: Recover a hacked account', url: 'https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account' },
  { id: 'digital-ftc-scam-report', name: 'FTC: ReportFraud', url: 'https://reportfraud.ftc.gov/', esUrl: 'https://reportefraude.ftc.gov/' },
  { id: 'digital-ftc-scam-recovery', name: 'FTC: What to do if you were scammed', url: 'https://consumer.ftc.gov/articles/what-do-if-you-were-scammed', esUrl: 'https://consumidor.ftc.gov/articulos/que-hacer-si-lo-estafaron' },

  { id: 'rights-documents', name: 'USAGov: Replace ID documents', url: 'https://www.usa.gov/replace-vital-documents', esUrl: 'https://www.usa.gov/es/reemplazo-documentos-personales' },
  { id: 'rights-ssa-card', name: 'Social Security: Replace a card', url: 'https://www.ssa.gov/number-card/replace-card', esUrl: 'https://www.ssa.gov/faqs/es/questions/KA-02017.html' },
  { id: 'rights-address', name: 'USAGov: Change your address', url: 'https://www.usa.gov/change-address', esUrl: 'https://www.usa.gov/es/cambiar-direccion-correo-postal' },
  { id: 'rights-vote', name: 'Vote.gov: Register or check registration', url: 'https://vote.gov/register', esUrl: 'https://vote.gov/es' },
  { id: 'rights-legal-aid', name: 'USAGov: Find affordable legal aid', url: 'https://www.usa.gov/legal-aid', esUrl: 'https://www.usa.gov/es/asistencia-legal-gratis' },
  { id: 'rights-eviction', name: 'USAGov: Avoid eviction', url: 'https://www.usa.gov/avoid-eviction', esUrl: 'https://www.usa.gov/es/evitar-desalojo-de-vivienda' },
  { id: 'rights-debt', name: 'CFPB: Debt validation notices', url: 'https://www.consumerfinance.gov/ask-cfpb/what-information-does-a-debt-collector-have-to-give-me-about-the-debt-en-331/' },
  { id: 'rights-credit-error', name: 'CFPB: Dispute a credit-report error', esName: 'USAGov: Corrija errores en su informe de crédito', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/', esUrl: 'https://www.usa.gov/es/corregir-informe-credito' },
  { id: 'rights-hospital-aid', name: 'CMS: Medical bill financial assistance', url: 'https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/medical-bill-guides-resources/apply-medical-bill-financial-assistance', esUrl: 'https://www.cms.gov/derechos-facturas-medicas/ayuda/guias/ayuda-financiera' },
  { id: 'rights-medical-bills', name: 'CMS: Medical bill rights', url: 'https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights', esUrl: 'https://www.cms.gov/derechos-facturas-medicas' },
  { id: 'rights-fair-housing', name: 'HUD: Report housing discrimination', url: 'https://www.hud.gov/reporthousingdiscrimination' },
  { id: 'rights-consumer-office', name: 'USAGov: State consumer protection offices', url: 'https://www.usa.gov/state-consumer', esUrl: 'https://www.usa.gov/es/estatal-consumidor' },
];

export const expansionRightsActions = [
  {
    id: 'digital-unique-passwords', category: 'digital', effort: 'week',
    en: { title: 'Replace one reused password', why: 'A stolen password can unlock every account where you used it again.', step: 'Start with your main email account. Give it a long, unique password; a password manager can create and remember one for you.' },
    es: { title: 'Cambia una contraseña que repites', why: 'Una contraseña robada puede abrir otras cuentas donde usaste la misma.', step: 'Empieza por tu correo principal. Usa una contraseña larga y única; un gestor puede crearla y guardarla por ti.' },
    sources: ['digital-ftc-passwords'],
  },
  {
    id: 'digital-two-factor', category: 'digital', effort: 'week',
    en: { title: 'Add a second sign-in step', why: 'A password alone may not stop someone who has stolen it.', step: 'Turn on two-factor authentication for email, banking, and other important accounts. Choose an authenticator app or security key when offered.' },
    es: { title: 'Añade un segundo paso al iniciar sesión', why: 'Una contraseña sola quizá no detenga a quien la haya robado.', step: 'Activa la verificación en dos pasos en el correo, el banco y otras cuentas importantes. Elige una app de autenticación o llave de seguridad si está disponible.' },
    sources: ['digital-ftc-mfa'],
  },
  {
    id: 'digital-auto-updates', category: 'digital', effort: 'today',
    en: { title: 'Turn on automatic updates', why: 'Security fixes help close gaps that attackers use.', step: 'Check update settings on your phone and computer, including the browser and apps you use most.' },
    es: { title: 'Activa las actualizaciones automáticas', why: 'Las correcciones de seguridad ayudan a cerrar fallas que aprovechan los atacantes.', step: 'Revisa los ajustes de actualización del teléfono y la computadora, incluido el navegador y las apps que más usas.' },
    sources: ['digital-ftc-passwords', 'digital-ftc-phone'],
  },
  {
    id: 'digital-lock-phone', category: 'digital', effort: 'today',
    en: { title: 'Lock your phone before it is lost', why: 'Your phone may hold messages, photos, passwords, and payment apps.', step: 'Set an automatic screen lock with a passcode of at least six digits. Turn on the built-in feature that can locate, lock, or erase a lost phone.' },
    es: { title: 'Protege tu teléfono antes de perderlo', why: 'Puede guardar mensajes, fotos, contraseñas y apps de pago.', step: 'Configura el bloqueo automático con un código de al menos seis dígitos. Activa la función para localizar, bloquear o borrar el teléfono si se pierde.' },
    sources: ['digital-ftc-phone'],
  },
  {
    id: 'digital-backup', category: 'digital', effort: 'week',
    en: { title: 'Back up what you cannot replace', why: 'A lost or broken device should not be your only copy of important files.', step: 'Turn on a phone or computer backup to a service or drive you control. Check that a recent photo or document appears in the backup.' },
    es: { title: 'Haz una copia de lo que no puedes recuperar', why: 'Un teléfono perdido o dañado no debería ser la única copia de tus archivos importantes.', step: 'Activa una copia de seguridad en un servicio o disco que controles. Comprueba que aparezca una foto o un documento reciente.' },
    sources: ['digital-ftc-phone', 'digital-ftc-phishing'],
  },
  {
    id: 'digital-phishing', category: 'digital', effort: 'today',
    en: { title: 'Open the app, not the surprise link', why: 'Fake delivery, password-reset, and account alerts can lead to stolen logins or malware.', step: 'If a message asks you to sign in or open an attachment, use the company app or a website you already know. Report and delete the suspicious message.' },
    es: { title: 'Abre la app, no el enlace inesperado', why: 'Las alertas falsas de entregas, contraseñas y cuentas pueden robar tus datos o instalar programas dañinos.', step: 'Si un mensaje pide que inicies sesión o abras un archivo, entra por la app o un sitio que ya conoces. Reporta y borra el mensaje sospechoso.' },
    sources: ['digital-ftc-phishing'],
  },
  {
    id: 'digital-home-wifi', category: 'digital', effort: 'plan',
    en: { title: 'Check your home Wi-Fi settings', why: 'A router left with default access can expose devices on your network.', step: 'If you manage the router, change its default admin password, use WPA2 or WPA3 security, and check for updates. Ask your internet provider for help if it manages the device.' },
    es: { title: 'Revisa la seguridad del Wi-Fi de casa', why: 'Un router con la contraseña de fábrica puede dejar expuestos los dispositivos de la red.', step: 'Si administras el router, cambia la contraseña de administrador, usa seguridad WPA2 o WPA3 y busca actualizaciones. Pide ayuda al proveedor de internet si él maneja el equipo.' },
    sources: ['digital-ftc-router'],
  },
  {
    id: 'digital-app-permissions', category: 'digital', effort: 'week',
    en: { title: 'Review what your apps can see', why: 'Some apps can access your location, contacts, or photos even when they do not need them.', step: 'Open your phone’s privacy settings. Turn off permissions an app does not need to work, or remove apps you no longer use.' },
    es: { title: 'Revisa los permisos de tus apps', why: 'Algunas pueden acceder a tu ubicación, contactos o fotos sin necesitarlos.', step: 'Abre los ajustes de privacidad del teléfono. Desactiva permisos innecesarios o elimina las apps que ya no usas.' },
    sources: ['digital-ftc-privacy'],
  },
  {
    id: 'digital-public-wifi', category: 'digital', effort: 'today',
    en: { title: 'Check the site on public Wi-Fi', why: 'Encryption helps on public networks, but it cannot make a fake website trustworthy.', step: 'Before signing in, check the site address and look for HTTPS. Keep your device updated, and leave a site that asks for information you did not expect.' },
    es: { title: 'Comprueba el sitio al usar Wi-Fi público', why: 'La conexión cifrada ayuda, pero no convierte un sitio falso en uno confiable.', step: 'Antes de iniciar sesión, revisa la dirección del sitio y busca HTTPS. Mantén tu dispositivo actualizado y sal si te piden datos inesperados.' },
    sources: ['digital-ftc-public-wifi'],
  },
  {
    id: 'digital-breach-response', category: 'digital', effort: 'today',
    en: { title: 'Act on a real data-breach notice', why: 'The useful next step depends on what information was exposed.', step: 'Go to the company’s site yourself to confirm the notice. Change any exposed or reused password, then use IdentityTheft.gov/DataBreach for steps matched to the data involved.' },
    es: { title: 'Actúa si se filtraron tus datos', why: 'El siguiente paso depende de qué información quedó expuesta.', step: 'Entra por tu cuenta al sitio de la empresa para confirmar el aviso. Cambia las contraseñas expuestas o repetidas y consulta IdentityTheft.gov/DataBreach.' },
    sources: ['digital-ftc-breach', 'digital-idtheft'],
  },
  {
    id: 'digital-hacked-account', category: 'digital', effort: 'today',
    en: { title: 'Recover a taken-over account', why: 'Quick action can limit further access and warn people who may receive fake messages from you.', step: 'Use the provider’s own recovery page. Once back in, change the password, sign out other sessions, check recovery details, and alert contacts if messages were sent.' },
    es: { title: 'Recupera una cuenta que te quitaron', why: 'Actuar pronto puede limitar el acceso y avisar a quienes reciban mensajes falsos de tu parte.', step: 'Usa la página oficial de recuperación. Al entrar, cambia la contraseña, cierra otras sesiones, revisa los datos de recuperación y avisa a tus contactos si se enviaron mensajes.' },
    sources: ['digital-ftc-recovery'],
  },
  {
    id: 'digital-report-scam', category: 'digital', effort: 'today',
    en: { title: 'Report a scam you spotted', why: 'The FTC uses scam reports to spot patterns and warn others.', step: 'Keep the messages, receipts, and contact details. Report what happened at ReportFraud.ftc.gov. If you paid or shared personal information, follow the FTC recovery guide right away.' },
    es: { title: 'Reporta una estafa que detectaste', why: 'La FTC usa los reportes para detectar patrones y advertir a otras personas.', step: 'Guarda los mensajes, recibos y datos de contacto. Reporta lo sucedido en ReporteFraude.ftc.gov. Si pagaste o compartiste datos personales, sigue enseguida la guía de la FTC para recuperarte.' },
    sources: ['digital-ftc-scam-report', 'digital-ftc-scam-recovery'],
  },

  {
    id: 'rights-replace-documents', category: 'rights', effort: 'plan',
    en: { title: 'Use the right office to replace an ID', why: 'Birth certificates, state IDs, and passports come from different agencies, with different requirements.', step: 'Use USAGov’s document guide to find the issuing office before paying a third-party site. Store the replacement instructions with your important records.' },
    es: { title: 'Busca la oficina correcta para reponer un documento', why: 'Las actas de nacimiento, identificaciones estatales y pasaportes se tramitan en oficinas distintas.', step: 'Consulta la guía de USAGov antes de pagarle a un intermediario. Guarda las instrucciones junto con tus documentos importantes.' },
    sources: ['rights-documents'],
  },
  {
    id: 'rights-social-security-card', category: 'rights', effort: 'week',
    en: { title: 'Replace a Social Security card for free', why: 'You often need only your number, but a replacement card has no SSA fee if you do need one.', step: 'Start at SSA.gov/number-card. Answer its questions to learn whether to apply online or make an office appointment; avoid sites charging for the form.' },
    es: { title: 'Repón gratis tu tarjeta del Seguro Social', why: 'Muchas veces basta con saber el número, pero si necesitas la tarjeta, el Seguro Social no cobra por reponerla.', step: 'Empieza en SSA.gov/number-card. Responde las preguntas para saber si puedes solicitarla en línea o necesitas una cita; evita sitios que cobran por el trámite.' },
    sources: ['rights-ssa-card'],
  },
  {
    id: 'rights-move-address', category: 'rights', effort: 'week',
    en: { title: 'Update your address after a move', why: 'Forwarding mail does not automatically update every government account.', step: 'Use the official USPS move page or a post office for forwarding. Then check which agencies, such as your state motor vehicle office, need a separate address change.' },
    es: { title: 'Actualiza tu dirección al mudarte', why: 'Reenviar el correo no cambia automáticamente tu dirección en todas las agencias.', step: 'Usa la página oficial de mudanzas de USPS o ve al correo. Luego revisa qué agencias, como la de vehículos de tu estado, requieren un cambio por separado.' },
    sources: ['rights-address'],
  },
  {
    id: 'rights-voter-record', category: 'rights', effort: 'plan',
    en: { title: 'Check your voter registration if eligible', why: 'Registration rules, deadlines, and address records differ by state.', step: 'Choose your state at Vote.gov to see how to register or verify your record and the current deadline. Update your record if you have moved or changed your name.' },
    es: { title: 'Revisa tu registro electoral si puedes votar', why: 'Los requisitos, plazos y datos del registro cambian según el estado.', step: 'Elige tu estado en Vote.gov para saber cómo inscribirte o verificar tus datos y consultar la fecha límite. Actualízalos si te mudaste o cambiaste de nombre.' },
    sources: ['rights-vote'],
  },
  {
    id: 'rights-find-legal-aid', category: 'rights', effort: 'today',
    en: { title: 'Look for civil legal aid early', why: 'Local programs may help with housing, family, consumer, or other civil problems, often based on income.', step: 'Use USAGov’s legal-aid directory or the Legal Services Corporation locator. Ask about eligibility, language help, and any deadline in your paperwork.' },
    es: { title: 'Busca ayuda legal civil a tiempo', why: 'Hay programas locales para vivienda, familia, consumo y otros asuntos civiles; muchos dependen de tus ingresos.', step: 'Usa el directorio de USAGov o el buscador de la Corporación de Servicios Legales. Pregunta por requisitos, atención en tu idioma y plazos de tus documentos.' },
    sources: ['rights-legal-aid'],
  },
  {
    id: 'rights-eviction-notice', category: 'rights', effort: 'today',
    en: { title: 'Get help when an eviction notice arrives', why: 'State and local rules differ, and waiting can narrow your options.', step: 'Keep the notice and your lease. Use USAGov’s eviction guide to find local housing help or legal aid, and ask what response date applies to your case.' },
    es: { title: 'Busca ayuda al recibir un aviso de desalojo', why: 'Las reglas locales varían y esperar puede reducir tus opciones.', step: 'Conserva el aviso y tu contrato. Usa la guía de USAGov para encontrar ayuda de vivienda o asesoría legal, y pregunta qué plazo corresponde a tu caso.' },
    sources: ['rights-eviction', 'rights-legal-aid'],
  },
  {
    id: 'rights-debt-notice', category: 'rights', effort: 'today',
    en: { title: 'Read a debt collector’s validation notice', why: 'It should help you identify the debt, amount, and how to dispute an error.', step: 'Compare the notice with your records and note its dispute deadline. If something is wrong, use the CFPB guide to respond in writing and keep a copy.' },
    es: { title: 'Lee el aviso de un cobrador de deudas', why: 'Debe ayudarte a identificar la deuda, el monto y cómo reclamar un error.', step: 'Compáralo con tus documentos y anota la fecha límite para reclamar. Si hay un error, consulta la guía del CFPB para responder por escrito y guarda una copia.' },
    sources: ['rights-debt'],
  },
  {
    id: 'rights-credit-dispute', category: 'rights', effort: 'week',
    en: { title: 'Dispute a credit-report error', why: 'An inaccurate account or balance can affect access to credit.', step: 'Tell both the credit reporting company and the business that supplied the data what is wrong. Include copies of supporting records and keep a copy of each dispute.' },
    es: { title: 'Reclama un error en tu informe de crédito', why: 'Una cuenta o saldo incorrecto puede afectar tu acceso al crédito.', step: 'Explica el error tanto a la compañía del informe como a la empresa que proporcionó el dato. Envía copias de tus pruebas y guarda copia de cada reclamo.' },
    sources: ['rights-credit-error'],
  },
  {
    id: 'rights-hospital-assistance', category: 'rights', effort: 'today',
    en: { title: 'Ask about hospital financial assistance', why: 'If a medical bill is hard to pay, you may qualify for help under the hospital’s policy.', step: 'Ask billing for its financial assistance or charity-care policy, eligibility rules, and application deadline. Check the application status after you submit it.' },
    es: { title: 'Pregunta por ayuda para pagar una factura médica', why: 'Si no puedes cubrirla, podrías calificar según la política del hospital.', step: 'Pide al departamento de facturación su política de ayuda financiera, los requisitos y el plazo para solicitarla. Después pregunta por el estado de tu solicitud.' },
    sources: ['rights-hospital-aid'],
  },
  {
    id: 'rights-medical-bill-check', category: 'rights', effort: 'today',
    en: { title: 'Check an unexpected medical bill', why: 'Some out-of-network bills and some self-pay bills above a written estimate may qualify for federal protections.', step: 'Keep the bill, insurance notice, and any estimate. Use CMS’s medical-bill guide to see which complaint or dispute process, if any, fits your situation.' },
    es: { title: 'Revisa una factura médica inesperada', why: 'Algunas facturas fuera de la red o muy por encima de un presupuesto escrito pueden tener protecciones federales.', step: 'Guarda la factura, el aviso del seguro y cualquier presupuesto. Consulta la guía de CMS para ver si corresponde presentar una queja o disputa.' },
    sources: ['rights-medical-bills'],
  },
  {
    id: 'rights-housing-discrimination', category: 'rights', effort: 'today',
    en: { title: 'Ask about housing discrimination', why: 'HUD accepts reports about possible discrimination in renting, buying, and other housing activities; time limits can apply.', step: 'Write down what happened, when, where, and who was involved. Contact HUD’s fair-housing office promptly to ask how to report it.' },
    es: { title: 'Consulta si hubo discriminación en vivienda', why: 'HUD recibe reportes sobre posibles actos discriminatorios al alquilar, comprar u obtener otros servicios de vivienda; hay plazos.', step: 'Anota qué pasó, cuándo, dónde y quién estuvo involucrado. Contacta pronto a la oficina de vivienda justa de HUD para preguntar cómo reportarlo.' },
    sources: ['rights-fair-housing'],
  },
  {
    id: 'rights-consumer-complaint', category: 'rights', effort: 'week',
    en: { title: 'Take an unresolved purchase problem to the right office', why: 'State consumer protection offices can help route complaints about ordinary product and service disputes.', step: 'For a business you know is legitimate, save receipts and messages and ask for a written resolution. If the issue remains, use USAGov’s state directory to find the right office.' },
    es: { title: 'Lleva un problema de compra a la oficina adecuada', why: 'Las oficinas estatales de protección al consumidor pueden orientar quejas sobre productos y servicios.', step: 'Si se trata de un negocio legítimo, guarda recibos y mensajes y pide una respuesta por escrito. Si el problema sigue, usa el directorio estatal de USAGov para encontrar la oficina adecuada.' },
    sources: ['rights-consumer-office'],
  },
];

export const sources = expansionRightsSources;
export const actions = expansionRightsActions;
