const students = [{
  name: 'Charfeddine Hamrouni',
  username: 'charlie-cs',
  role: 'enseignant',
  avatar: { src: 'https://avatars.githubusercontent.com/u/45672435?v=4' }
}, {
  name: 'Anthony Fu',
  username: 'antfu',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' }
}, {
  name: 'Sébastien Chopin',
  username: 'Atinux',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' }
}, {
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' }
}, {
  name: 'Céline Dumerc',
  username: 'celinedumerc',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/celinedumerc' }
}, {
  name: 'Daniel Roe',
  username: 'danielroe',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' }
}, {
  name: 'Farnabaz',
  username: 'farnabaz',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/farnabaz' }
}, {
  name: 'Ferdinand Coumau',
  username: 'FerdinandCoumau',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/FerdinandCoumau' }
}, {
  name: 'Florent Delerue',
  username: 'Flosciante',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/Flosciante' }
}, {
  name: 'Baptiste Leproux',
  username: 'larbish',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/larbish' }
}, {
  name: 'Pooya Parsa',
  username: 'pi0',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' }
}, {
  name: 'Sarah Moriceau',
  username: 'SarahM19',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/SarahM19' }
}, {
  name: 'Sylvain Marroufin',
  username: 'smarroufin',
  role: 'élève',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/smarroufin' }
}]

export default eventHandler(async () => {
  return students
})
