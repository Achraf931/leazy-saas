import type { User, UserStatus } from '~/types'

const users: User[] = [{
  id: 1,
  name: 'Alex Smith',
  email: 'alex.smith@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=1'
  },
  status: 'présent',
  location: 'New York, USA'
}, {
  id: 2,
  name: 'Jordan Brown',
  email: 'jordan.brown@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=2'
  },
  status: 'absent',
  location: 'London, UK'
}, {
  id: 3,
  name: 'Taylor Green',
  email: 'taylor.green@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=3'
  },
  status: 'en retard',
  location: 'Paris, France'
}, {
  id: 4,
  name: 'Morgan White',
  email: 'morgan.white@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=4'
  },
  status: 'présent',
  location: 'Berlin, Germany'
}, {
  id: 5,
  name: 'Casey Gray',
  email: 'casey.gray@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=5'
  },
  status: 'présent',
  location: 'Tokyo, Japan'
}, {
  id: 6,
  name: 'Jamie Johnson',
  email: 'jamie.johnson@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=6'
  },
  status: 'présent',
  location: 'Sydney, Australia'
}, {
  id: 7,
  name: 'Riley Davis',
  email: 'riley.davis@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=7'
  },
  status: 'présent',
  location: 'New York, USA'
}, {
  id: 8,
  name: 'Kelly Wilson',
  email: 'kelly.wilson@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=8'
  },
  status: 'présent',
  location: 'London, UK'
}, {
  id: 9,
  name: 'Drew Moore',
  email: 'drew.moore@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=9'
  },
  status: 'en retard',
  location: 'Paris, France'
}, {
  id: 10,
  name: 'Jordan Taylor',
  email: 'jordan.taylor@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=10'
  },
  status: 'présent',
  location: 'Berlin, Germany'
}, {
  id: 11,
  name: 'Morgan Anderson',
  email: 'morgan.anderson@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=11'
  },
  status: 'présent',
  location: 'Tokyo, Japan'
}, {
  id: 12,
  name: 'Casey Thomas',
  email: 'casey.thomas@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=12'
  },
  status: 'absent',
  location: 'Sydney, Australia'
}, {
  id: 13,
  name: 'Jamie Jackson',
  email: 'jamie.jackson@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=13'
  },
  status: 'absent',
  location: 'New York, USA'
}, {
  id: 14,
  name: 'Riley White',
  email: 'riley.white@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=14'
  },
  status: 'absent',
  location: 'London, UK'
}, {
  id: 15,
  name: 'Kelly Harris',
  email: 'kelly.harris@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=15'
  },
  status: 'présent',
  location: 'Paris, France'
}, {
  id: 16,
  name: 'Drew Martin',
  email: 'drew.martin@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=16'
  },
  status: 'présent',
  location: 'Berlin, Germany'
}, {
  id: 17,
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=17'
  },
  status: 'absent',
  location: 'Tokyo, Japan'
}, {
  id: 18,
  name: 'Jordan Garcia',
  email: 'jordan.garcia@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=18'
  },
  status: 'présent',
  location: 'Sydney, Australia'
}, {
  id: 19,
  name: 'Taylor Rodriguez',
  email: 'taylor.rodriguez@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=19'
  },
  status: 'en retard',
  location: 'New York, USA'
}, {
  id: 20,
  name: 'Morgan Lopez',
  email: 'morgan.lopez@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=20'
  },
  status: 'présent',
  location: 'London, UK'
}]

export default eventHandler(async (event) => {
  const { q, statuses, locations, sort, order } = getQuery(event) as { q?: string, statuses?: UserStatus[], locations?: string[], sort?: 'name' | 'email', order?: 'asc' | 'desc' }

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000)
  })

  return users.filter((user) => {
    if (!q) return true

    return user.name.search(new RegExp(q, 'i')) !== -1 || user.email.search(new RegExp(q, 'i')) !== -1
  }).filter((user) => {
    if (!statuses?.length) return true

    return statuses.includes(user.status)
  }).filter((user) => {
    if (!locations?.length) return true

    return locations.includes(user.location)
  }).sort((a, b) => {
    if (!sort) return 0

    const aValue = a[sort]
    const bValue = b[sort]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
})
