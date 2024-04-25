<script setup>
import { sub, formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const router = useRouter()
const toast = useToast()

const client = useSanctumClient()

const { data: lessons, pending, error, refresh } = await useAsyncData('lessons', () => client('/api/teacher/lessons'), { lazy: true })
const localePath = useLocalePath()

const q = ref('')

const isOpen = ref(false)

const links = [
  {
    label: 'Bibliothèque',
    to: localePath({ name: 'library' })
  },
  {
    label: 'Leçons',
    to: localePath({ name: 'library-lessons' })
  }
]

const isDeleteLessonModalOpen = ref({ open: false, lesson: null, refresh })

const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref('daily')

const isLoading = ref(false)
const selected = ref([])
const selectedThemes = ref([])
const chapters = [
  { label: 'Chapter 1', value: 'chapter-1' },
  { label: 'Chapter 2', value: 'chapter-2' },
  { label: 'Chapter 3', value: 'chapter-3' },
  { label: 'Chapter 4', value: 'chapter-4' }
]
const themes = [
  { label: 'Theme 1', value: 'theme-1' },
  { label: 'Theme 2', value: 'theme-2' },
  { label: 'Theme 3', value: 'theme-3' },
  { label: 'Theme 4', value: 'theme-4' }
]

const filteredLessons = computed(() => {
  return lessons.value?.data.filter(lesson => {
    return lesson.name.search(new RegExp(q.value, 'i')) !== -1 || lesson.description.search(new RegExp(q.value, 'i')) !== -1
  })
})

const handleDelete = lesson => {
  isDeleteLessonModalOpen.value.open = true
  isDeleteLessonModalOpen.value.lesson = lesson
}

const fields = reactive({
  name: undefined,
  description: undefined
})

const validate = (state) => {
  const errors = []

  if (!state.name) errors.push({ path: 'name', message: 'Le titre est requis' })

  return errors
}

const onSubmit = async (state) => {
  isLoading.value = true
  const response = await client('/api/teacher/lessons', { method: 'POST', body: { ...state.data, chapter_id: 1, draft: true, private: true, slug: 'test_create5', content: JSON.stringify({
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "id": "J9SRw96O1H3RXZyh1svGy",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "zCYHJ42HPMTqfzCst3gDB",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "really are"
              },
              {
                "type": "text",
                "text": " just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "lg_8mCt0fQbFTA5F0aIIa",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "We get lots of complaints about it actually, with people regularly asking us things like:"
              }
            ]
          },
          {
            "type": "blockquote",
            "attrs": {
              "id": "Sn8CwxeR8iDJKp1raMAHO",
              "data-node-name": "blockquote"
            },
            "content": [
              {
                "type": "paragraph",
                "attrs": {
                  "id": "aHfUbKMfBmRbu8NpsgBuN",
                  "data-node-name": "paragraph"
                },
                "content": [
                  {
                    "type": "text",
                    "marks": [
                      {
                        "type": "bold"
                      },
                      {
                        "type": "italic"
                      }
                    ],
                    "text": "Why is Tailwind removing the default styles on my "
                  },
                  {
                    "type": "text",
                    "marks": [
                      {
                        "type": "code",
                        "attrs": {
                          "id": null,
                          "data-node-name": null
                        }
                      }
                    ],
                    "text": "h1"
                  },
                  {
                    "type": "text",
                    "text": " elements? How do I disable this? What do you mean I lose all the other base styles too?"
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "ZzR08XADth9nfhOBgm3eH",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "p"
              },
              {
                "type": "text",
                "text": " element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "awesome"
              },
              {
                "type": "text",
                "text": ", not awful."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "paRSN46i_LDEfSxjsl6eJ",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "The "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "@tailwindcss/typography"
              },
              {
                "type": "text",
                "text": " plugin is our attempt to give you what you "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "actually"
              },
              {
                "type": "text",
                "text": " want, without any of the downsides of doing something stupid like disabling our base styles."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "JBNbryi_TAnbX3M6fqZ0x",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "It adds a new "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "prose"
              },
              {
                "type": "text",
                "text": " class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:"
              }
            ]
          },
          {
            "type": "codeBlock",
            "attrs": {
              "id": "KIs1M9v9a9SZpn73AYael",
              "data-node-name": "codeBlock",
              "language": "html"
            },
            "content": [
              {
                "type": "text",
                "text": "<article class=\"prose\">\n  <h1>Garlic bread with cheese: What the science tells us</h1>\n  <p>\n    For years parents have espoused the health benefits of eating garlic bread with cheese to their\n    children, with the food earning such an iconic status in our culture that kids will often dress\n    up as warm, cheesy loaf for Halloween.\n  </p>\n  <p>\n    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases\n    springing up around the country.\n  </p>\n  <!-- ... -->\n</article>\n"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "D92vXSImSJimAFWf26EOo",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "For more information about how to use the plugin and the features it includes, "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "link",
                    "attrs": {
                      "id": null,
                      "data-node-name": null,
                      "href": "https://github.com/tailwindcss/typography/blob/master/README.md",
                      "target": "_blank",
                      "rel": "noopener noreferrer nofollow",
                      "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                    }
                  },
                  {
                    "type": "underline",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  },
                  {
                    "type": "bold"
                  }
                ],
                "text": "read the documentation"
              },
              {
                "type": "text",
                "text": "."
              }
            ]
          },
          {
            "type": "horizontalRule",
            "attrs": {
              "id": "Zlaq7himTNejiJkv0IvOb",
              "data-node-name": "horizontalRule"
            }
          },
          {
            "type": "heading",
            "attrs": {
              "id": "Z1esK9Wfh-o1LsIkv7ID9",
              "data-node-name": "heading",
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "What to expect from here on out"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "oto0qDD5z7OdpnPR4jzGD",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "bold text"
              },
              {
                "type": "text",
                "text": ", unordered lists, ordered lists, code blocks, block quotes, "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "and even italics"
              },
              {
                "type": "text",
                "text": "."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "fJxDf1jdFJloVbipEZVaX",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "It's important to cover all of these use cases for a few reasons:"
              }
            ]
          },
          {
            "type": "orderedList",
            "attrs": {
              "tight": true,
              "id": "_Sm2xNFF3hWy02RuQOgfj",
              "data-node-name": "orderedList",
              "start": 1
            },
            "content": [
              {
                "type": "listItem",
                "attrs": {
                  "id": "6UvXSs1JN9YMsB4hHJdD8",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "CHp3SwU6NgZn08uC9sL2p",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "We want everything to look good out of the box."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "WYFX7E-D3oRcfat0A4F5m",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "7DEMv-aQt36Li8N0wwvHW",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "Really just the first reason, that's the whole point of the plugin."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "kW4z0W24uiKrNovJ5nkKM",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "YqjBTI3yVUIkFb1zptXYl",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "Here's a third pretend reason though a list with three items looks more realistic than a list with two items."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "dXjsSskweX5FdHH4M9ASg",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Now we're going to try out another header style."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "qo7nzh8kxqSZjKpZPCjWz",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "Typography should be easy"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "uq_1ubuBD_YyyM9nF-ZUn",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "1GepRSkDHl2LJkv2_ZzKK",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Something a wise person once told me about typography is:"
              }
            ]
          },
          {
            "type": "blockquote",
            "attrs": {
              "id": "DpxKHDlABGbZevjMTA-Jz",
              "data-node-name": "blockquote"
            },
            "content": [
              {
                "type": "paragraph",
                "attrs": {
                  "id": "6DgesDXB9DoUiz_3_gle_",
                  "data-node-name": "paragraph"
                },
                "content": [
                  {
                    "type": "text",
                    "marks": [
                      {
                        "type": "bold"
                      },
                      {
                        "type": "italic"
                      }
                    ],
                    "text": "Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad."
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "PcqiFXB-Adf82qqdXxMvv",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "It's probably important that images look okay here by default as well:"
              }
            ]
          },
          {
            "type": "image",
            "attrs": {
              "id": "2STgtZuSpTuiSQ3bizLve",
              "data-node-name": "image",
              "src": "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
              "alt": "",
              "title": null,
              "width": "fit-content",
              "height": null,
              "align": "center"
            }
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "21CB2ww_8wm6ZAvTE_FbE",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "CwgQsIQbIt3EyRlUZKpmP",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Now I'm going to show you an example of an unordered list to make sure that looks good, too:"
              }
            ]
          },
          {
            "type": "bulletList",
            "attrs": {
              "tight": true,
              "id": "fmiQlu7QVOZxujNCDy1DJ",
              "data-node-name": "bulletList"
            },
            "content": [
              {
                "type": "listItem",
                "attrs": {
                  "id": "_ZWF4T9UvgrIhzBHLsDYs",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "2sXudFg3mSBJ8d0v7jNKH",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "So here is the first item in this list."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "Ki4dkM6bqCmZBCxAFgeXC",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "LpmzjnnrkN6pBMAmRs5Tp",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "In this example we're keeping the items short."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "4YVJm1gZtBJevw1JYQ-fi",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "xnng5CkG6B-4juFsphs67",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "Later, we'll use longer, more complex list items."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "OcAZgog9uZCfWPDiZ4mqu",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "And that's the end of this section."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "6qgKi0eGLKKxE0e-KxuQo",
              "data-node-name": "heading",
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "What if we stack headings?"
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "i4W87U3D4MI3_r-xRjNCD",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "We should make sure that looks good, too."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "EaF92o_EFSbZCei7KB6G-",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "lIGQRT-p83CWIvjiDpogb",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "When a heading comes after a paragraph …"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "aheCuK7U9MrEel4R62Leo",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like."
              }
            ]
          },
          {
            "type": "bulletList",
            "attrs": {
              "tight": false,
              "id": "e-mfNe9TBptvzjMkuVza3",
              "data-node-name": "bulletList"
            },
            "content": [
              {
                "type": "listItem",
                "attrs": {
                  "id": "0ESssgg9boLC9KHhPAozZ",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "e-YkttYTpbqUb08Jt_3In",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "I often do this thing where list items have headings."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "R-yamlZimYx9WNZnWQ28e",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "iulNCR1mNXOMFUqPwxTcH",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "uS_aBDZ9AGKh734OL26-7",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "e2SSFc2a5f9ivtAjeTzf5",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "Since this is a list, I need at least two items."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "b3HV_OH93mWUMdwQZIjFm",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles."
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "zqxIZmockzYw-Ide4dOWw",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "n4pR2JU_bvyjjdzpSlgfR",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "It's not a bad idea to add a third item either."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "MURqW-Cb0tBAVpkMjvEzt",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "ZKsrTQyFW6jkXxq_l9mH7",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "X7MG3R7va56M4bzYnTjVC",
              "data-node-name": "heading",
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "Code should look okay by default."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "81JWtrPG8oW1vZ7SVSGp8",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "I think most people are going to use "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "link",
                    "attrs": {
                      "id": null,
                      "data-node-name": null,
                      "href": "https://highlightjs.org/",
                      "target": "_blank",
                      "rel": "noopener noreferrer nofollow",
                      "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                    }
                  },
                  {
                    "type": "underline",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  },
                  {
                    "type": "bold"
                  }
                ],
                "text": "highlight.js"
              },
              {
                "type": "text",
                "text": " or "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "link",
                    "attrs": {
                      "id": null,
                      "data-node-name": null,
                      "href": "https://prismjs.com/",
                      "target": "_blank",
                      "rel": "noopener noreferrer nofollow",
                      "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                    }
                  },
                  {
                    "type": "underline",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  },
                  {
                    "type": "bold"
                  }
                ],
                "text": "Prism"
              },
              {
                "type": "text",
                "text": " or something if they want to style their code blocks but it wouldn't hurt to make them look "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "okay"
              },
              {
                "type": "text",
                "text": " out of the box, even with no syntax highlighting."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "eOmeBkoXHFs_f-MLzW21C",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Here's what a default "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "tailwind.config.js"
              },
              {
                "type": "text",
                "text": " file looks like at the time of writing:"
              }
            ]
          },
          {
            "type": "codeBlock",
            "attrs": {
              "id": "Yl78zsK_UdggRJuvoTDzh",
              "data-node-name": "codeBlock",
              "language": "js"
            },
            "content": [
              {
                "type": "text",
                "text": "module.exports = {\n  purge: [],\n  theme: {\n    extend: {},\n  },\n  variants: {},\n  plugins: [],\n}\n"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "G3_TOy_otbUOBj73uFhqJ",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Hopefully that looks good enough to you."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "KT7LItKw0BxgQFCK_5cWK",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "What about nested lists?"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "D9sotnSuz8muOR0RKKsa4",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work."
              }
            ]
          },
          {
            "type": "orderedList",
            "attrs": {
              "tight": true,
              "id": "9UOdDm2t8WQbbtJDq77Ex",
              "data-node-name": "orderedList",
              "start": 1
            },
            "content": [
              {
                "type": "listItem",
                "attrs": {
                  "id": "uMtaso_wjlqPH7aUILI1p",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "ly78lrbVQP01kyVJf4Uru",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "Nested lists are rarely a good idea."
                      }
                    ]
                  },
                  {
                    "type": "bulletList",
                    "attrs": {
                      "tight": true,
                      "id": "r-pFwEYotf3bZ5021gbdc",
                      "data-node-name": "bulletList"
                    },
                    "content": [
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "6CZE3SwS45ePDI9Rn_g9y",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "b7FBT6eLKoZvPKeeYnZ6U",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "You might feel like you are being really \"organized\" or something but you are just creating a gross shape on the screen that is hard to read."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "T9-hmj9-w4rZSV44CIftF",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "NXWpJ5vW_jzZg_c_vqC7z",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Nested navigation in UIs is a bad idea too, keep things as flat as possible."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "v97azLvO5GiCqc0s1jJRA",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "Zzi5Zqp5tr6IuReq2dvso",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Nesting tons of folders in your source code is also not helpful."
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "1LNBcspb0u-4-EcGkqAeq",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "9BF7ZG-tBCaliOgMnLW2F",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "Since we need to have more items, here's another one."
                      }
                    ]
                  },
                  {
                    "type": "bulletList",
                    "attrs": {
                      "tight": true,
                      "id": "-kd5laN4b3XodAmKDoRqH",
                      "data-node-name": "bulletList"
                    },
                    "content": [
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "dVhlP0zDHugRpeHugnAaX",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "2kZ-D-pG5pGevmDkmFc_i",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "I'm not sure if we'll bother styling more than two levels deep."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "34ltSaczXwSkWhzCZuX_9",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "HDp3prMYWbI1l00nSjBog",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Two is already too much, three is guaranteed to be a bad idea."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "ZSh8uIATmGdIcnqfxp4yv",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "2nk-aq7s-yKipzySKb78J",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "If you nest four levels deep you belong in prison."
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "J-qluEcsOPRqveBev8RHi",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "yAXvJfSnFC4ijSAspHQIF",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "Two items isn't really a list, three is good though."
                      }
                    ]
                  },
                  {
                    "type": "bulletList",
                    "attrs": {
                      "tight": true,
                      "id": "vIOzX0y2ptZmFOOkeMF-7",
                      "data-node-name": "bulletList"
                    },
                    "content": [
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "Y7FuYObav7sCKqN5Cb0jy",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "BN1eCRFy3CjwNLmR75Ha4",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Again please don't nest lists if you want people to actually read your content."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "-1H6lnUB7yfPi5_h4irl7",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "iwpS41EdvZXypxvTzGwYC",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Nobody wants to look at this."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "Qg2lIGY6b0a0t49NzQqPL",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "3bvY2z61ZSBF-XqqPlhGn",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "I'm upset that we even have to bother styling this."
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "XIwUGW099qZRFvoLDzCcs",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "The most annoying thing about lists in Markdown is that "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "<li>"
              },
              {
                "type": "text",
                "text": " elements aren't given a child "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "<p>"
              },
              {
                "type": "text",
                "text": " tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too."
              }
            ]
          },
          {
            "type": "bulletList",
            "attrs": {
              "tight": false,
              "id": "gAc47CSRNgIsC8j9JkmGX",
              "data-node-name": "bulletList"
            },
            "content": [
              {
                "type": "listItem",
                "attrs": {
                  "id": "AMIT8DgKuTXVo-y_Cm0gE",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "WSKRB6R7JrmkMpLgqXz7z",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "For example, here's another nested list."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "Bv1VfZqYocOLFweJSmoUR",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "But this time with a second paragraph."
                      }
                    ]
                  },
                  {
                    "type": "bulletList",
                    "attrs": {
                      "tight": true,
                      "id": "dbfPbX3fddynNxFN_IFej",
                      "data-node-name": "bulletList"
                    },
                    "content": [
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "ozpk4Q8Bbhe9S5Tkw6jcn",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "D2UAORLtDDjMxLLAt6Iy3",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "These list items won't have "
                              },
                              {
                                "type": "text",
                                "marks": [
                                  {
                                    "type": "code",
                                    "attrs": {
                                      "id": null,
                                      "data-node-name": null
                                    }
                                  }
                                ],
                                "text": "<p>"
                              },
                              {
                                "type": "text",
                                "text": " tags"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "5o4k0fkGNotbqFEUROUF-",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "aQWopP3VzngjZQv2_10jJ",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Because they are only one line each"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "w8cUfxKhk6SzrU7K-ozZk",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "7DTGwtrL-lzTFoMrll4e9",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ],
                        "text": "But in this second top-level list item, they will."
                      }
                    ]
                  },
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "H2LRwnoKkn9Z_u6FS4_k5",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "This is especially annoying because of the spacing on this paragraph."
                      }
                    ]
                  },
                  {
                    "type": "bulletList",
                    "attrs": {
                      "tight": false,
                      "id": "XJ-p7RpG83-xSXS2XyF90",
                      "data-node-name": "bulletList"
                    },
                    "content": [
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "MH4ogPcYbN3SwEm-5hKf7",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "cf1QOOyo_xCVce5u0uWJh",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "As you can see here, because I've added a second line, this list item now has a "
                              },
                              {
                                "type": "text",
                                "marks": [
                                  {
                                    "type": "code",
                                    "attrs": {
                                      "id": null,
                                      "data-node-name": null
                                    }
                                  }
                                ],
                                "text": "<p>"
                              },
                              {
                                "type": "text",
                                "text": " tag."
                              }
                            ]
                          },
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "xgunswIG5pwP60FGZ2kYl",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "This is the second line I'm talking about by the way."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "listItem",
                        "attrs": {
                          "id": "pxPU99z_iNNx3sA1Sy66I",
                          "data-node-name": "listItem"
                        },
                        "content": [
                          {
                            "type": "paragraph",
                            "attrs": {
                              "id": "2U7GthpYIWTxMRdvTtRdi",
                              "data-node-name": "paragraph"
                            },
                            "content": [
                              {
                                "type": "text",
                                "text": "Finally here's another list item so it's more like a list."
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "listItem",
                "attrs": {
                  "id": "M1G-XJK-j8DKmvgM-UDKS",
                  "data-node-name": "listItem"
                },
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "id": "riQJoXzFjz_2LOjsWoFgL",
                      "data-node-name": "paragraph"
                    },
                    "content": [
                      {
                        "type": "text",
                        "text": "A closing list item, but with no nested list, because why not?"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "WSIKvE1NnMhEBtcO0z_lq",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "And finally a sentence to close off this section."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "uMV1v2IX8Yc1dmKupnURe",
              "data-node-name": "heading",
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "There are other elements we need to style"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "HD1sYN2f-qG-fxsyWmyB0",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "I almost forgot to mention links, like "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "link",
                    "attrs": {
                      "id": null,
                      "data-node-name": null,
                      "href": "https://tailwindcss.com/",
                      "target": "_blank",
                      "rel": "noopener noreferrer nofollow",
                      "class": "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                    }
                  },
                  {
                    "type": "underline",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  },
                  {
                    "type": "bold"
                  }
                ],
                "text": "this link to the Tailwind CSS website"
              },
              {
                "type": "text",
                "text": ". We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "mVAAxlPyanThZJzpvaoEC",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "We even included table styles, check it out:"
              }
            ]
          },
          {
            "type": "table",
            "content": [
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableHeader",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "SLSAvINEayMZ3JYLVs-JQ",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "marks": [
                              {
                                "type": "bold"
                              }
                            ],
                            "text": "Wrestler"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableHeader",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "VPlFovHVxr4J7dm7NfVhd",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "marks": [
                              {
                                "type": "bold"
                              }
                            ],
                            "text": "Origin"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableHeader",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "osrLt2PDCTl6RjuYfRKY_",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "marks": [
                              {
                                "type": "bold"
                              }
                            ],
                            "text": "Finisher"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "UG_AMslLv9GqfK0uCNiRp",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Bret \"The Hitman\" Hart"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "al8csnIURg898WZZ9kN5s",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Calgary, AB"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "x9PIuhXa-l8B9B1f7UlTy",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Sharpshooter"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "VhgHNS5ZlP39yuLyb3Q5k",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Stone Cold Steve Austin"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "cW_6ehqt-MRF1hhoIgvl_",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Austin, TX"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "azCwWVnfojLTtUt4KsAF9",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Stone Cold Stunner"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "D8fRUT3aC-vdeloJMMKTF",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Randy Savage"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "7ocMkfQe2KqqQIxn5KWJ1",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Sarasota, FL"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "h195S1ocHYyNUi8O-IwyK",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Elbow Drop"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "G8orIhTqg4pfPpQHes29j",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Vader"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "S7GC1w0BnILHQGJRHXmI8",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Boulder, CO"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "boc5JGcaNlUiNXHVH42v6",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Vader Bomb"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "0EB-wYzcmBCZPmz7s6qw4",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Razor Ramon"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "ep9yL9VPbRVupA_0QjSOO",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Chuluota, FL"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tableCell",
                    "attrs": {
                      "colspan": 1,
                      "rowspan": 1,
                      "colwidth": null
                    },
                    "content": [
                      {
                        "type": "paragraph",
                        "attrs": {
                          "id": "B9PIovh3-zv6-ameaqFrx",
                          "data-node-name": "paragraph"
                        },
                        "content": [
                          {
                            "type": "text",
                            "text": "Razor's Edge"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "1nCX68HQuABXG4VIsaPZP",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "We also need to make sure inline code looks good, like if I wanted to talk about "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "<span>"
              },
              {
                "type": "text",
                "text": " elements or tell you the good news about "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "@tailwindcss/typography"
              },
              {
                "type": "text",
                "text": "."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "E2bYR7qEa8ER5cgmsD-nK",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "Sometimes I even use "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "code"
              },
              {
                "type": "text",
                "text": " in headings"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "scRVciYjQjeUgkVKGhkEe",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Even though it's probably a bad idea, and historically I've had a hard time making it look good. This "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "\"wrap the code blocks in backticks\""
              },
              {
                "type": "text",
                "text": " trick works pretty well though really."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "RaYxaG-QjzCvEAGM9z2rV",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Another thing I've done in the past is put a "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "code"
              },
              {
                "type": "text",
                "text": " tag inside of a link, like if I wanted to tell you about the "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "tailwindcss/docs"
              },
              {
                "type": "text",
                "text": " repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "rSU44ZLhYX_5VlQsd3zqy",
              "data-node-name": "heading",
              "level": 4
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "We haven't used an "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h4"
              },
              {
                "type": "text",
                "text": " yet"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "KwHTzm-SnKSYIv96C3hHy",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "But now we have. Please don't use "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h5"
              },
              {
                "type": "text",
                "text": " or "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h6"
              },
              {
                "type": "text",
                "text": " in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "before"
              },
              {
                "type": "text",
                "text": " pseudo-element to scream at you if you use an "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h5"
              },
              {
                "type": "text",
                "text": " or "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h6"
              },
              {
                "type": "text",
                "text": "."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "e6EwwyEnqE87dycFwpiai",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "We don't style them at all out of the box because "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h4"
              },
              {
                "type": "text",
                "text": " elements are already so small that they are the same size as the body copy. What are we supposed to do with an "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h5"
              },
              {
                "type": "text",
                "text": ", make it "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "smaller"
              },
              {
                "type": "text",
                "text": " than the body copy? No thanks."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "tkx2IbUMGOBBmbwO2xcR1",
              "data-node-name": "heading",
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "We still need to think about stacked headings though."
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "id": "eomx24bc93ZpksRWRQzLq",
              "data-node-name": "heading",
              "level": 4
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "Let's make sure we don't screw that up with "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "code",
                    "attrs": {
                      "id": null,
                      "data-node-name": null
                    }
                  }
                ],
                "text": "h4"
              },
              {
                "type": "text",
                "text": " elements, either."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "j1f73IE1NOg8pFuzMfF92",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Phew, with any luck we have styled the headings above this text and they look pretty good."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "03QoeTwwzo97_tGKqXxsX",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document."
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "id": "YFjggEwGoFl766axw5OI_",
              "data-node-name": "paragraph"
            },
            "content": [
              {
                "type": "text",
                "text": "What I've written here is probably long enough, but adding this final sentence can't hurt."
              }
            ]
          }
        ]
      }) } })

  if (response) setTimeout(async () => {
    isLoading.value = false
    isOpen.value = false
    await router.push(localePath({ name: 'library-lessons-id_slug', params: { id: response.id, slug: response.slug } }))
    toast.add({ icon: 'i-heroicons-check-circle', title: 'Nouvelle leçon crée', color: 'green' })
  }, 2000)
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <ToggleDrawer />
          <UBreadcrumb :links="links" />
        </template>
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" @click="isOpen = true" label="Créer une leçon" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Rechercher une leçon" />

          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="ml-2.5" />
        </template>

        <template #right>
          <USelectMenu v-slot="{ open }" v-model="selectedThemes" :options="themes" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Themes: ' + selectedThemes.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>

          <USelectMenu v-slot="{ open }" v-model="selected" :options="chapters" option-attribute="label" multiple placeholder="Select chapters">
            <UButton color="gray" :label="'Chapters: ' + selected.length">
              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid" :class="[open && 'transform rotate-90']" />
              </template>
            </UButton>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <template v-if="!pending">
        <UDashboardPanelContent>
          <UBlogList v-if="filteredLessons.length" orientation="horizontal" :ui="{ wrapper: 'p-px overflow-y-auto gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' }">
            <ULink v-for="lesson in filteredLessons" :key="lesson.id" :to="localePath({ name: 'library-lessons-id_slug', params: { id: lesson.id, slug: lesson.slug } })" class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-lg text-xs flex flex-col items-start gap-4 p-3">
              <div class="flex items-start justify-between w-full">
                <div class="flex items-center justify-center rounded-lg bg-pink-100 p-2">
                  <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-pink-400" />
                </div>
                <UDropdown :ui="{ item: { size: 'text-xs' }, width: 'w-auto' }" :items="[[{ label: 'Renommer', icon: 'i-heroicons-pencil-square' }, { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => handleDelete(lesson) }]]" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="gray" :padded="false" />
                </UDropdown>
              </div>
              <div>
                <h2 class="text-gray-900 dark:text-white font-semibold line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 text-base">{{ lesson.name }}</h2>
                <p class="line-clamp-2 text-gray-400 text-xs mt-0.5">{{ lesson.description }}</p>
              </div>
              <div v-if="lesson.chapter" class="flex items-start gap-2">
                <UBadge v-if="lesson.chapter.theme" variant="soft" color="yellow" size="xs">{{ lesson.chapter.theme.name }}</UBadge>
                <UBadge variant="soft" color="blue" size="xs">{{ lesson.chapter.name }}</UBadge>
              </div>
              <div class="flex items-center justify-start gap-1 mt-auto">
                <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 text-gray-400 dark:text-white" />
                <p class="text-gray-400 text-xs">{{ lesson.updated_at === lesson.created_at ? 'Créé' : 'Modifié' }} {{ formatDistanceToNow(new Date(lesson.updated_at), { locale: frLocale, addSuffix: true }) }}</p>
              </div>
            </ULink>
          </UBlogList>
          <p v-else class="text-center text-gray-400 dark:text-white text-sm mt-4">Aucune leçon trouvée</p>
        </UDashboardPanelContent>

        <div v-if="filteredLessons" class="p-2.5 flex items-center justify-center border-t border-gray-200">
          <UPagination size="xs" show-first show-last :page-count="lessons.per_page" :total="lessons.total" v-model="lessons.current_page" :max="5" />
        </div>
      </template>
    </UDashboardPanel>

    <UDashboardModal prevent-close v-model="isOpen" title="Créer une leçon" :ui="{ width: 'sm:max-w-md' }">
      <UForm class="space-y-4" :state="fields" :validate="validate" @submit="onSubmit">
        <UFormGroup label="Titre" name="title">
          <UInput type="text" placeholder="Titre de la leçon" autofocus v-model="fields.name" />
        </UFormGroup>

        <UFormGroup label="Description (optionnelle)" name="description">
          <UTextarea placeholder="Description de la leçon" v-model="fields.description" />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
          <UButton :loading="isLoading" type="submit" label="Créer" color="black" />
        </div>
      </UForm>
    </UDashboardModal>

    <LessonsDeleteLessonModal v-model="isDeleteLessonModalOpen" />
  </UDashboardPage>
</template>
