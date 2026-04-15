'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const films = [
  { title: 'Bajirao Mastani',           year: '2015', category: 'Bollywood',    src: '/projectsnew/Bajirao_Mastani_poster.jpg'              },
  { title: 'Sanju',                     year: '2018', category: 'Bollywood',    src: '/projectsnew/Sanju_poster.jpg'                        },
  { title: 'Dunki',                     year: '2023', category: 'Bollywood',    src: '/projectsnew/Dunki_poster.jpg'                        },
  { title: 'Kalank',                    year: '2019', category: 'Bollywood',    src: '/projectsnew/Kalank.jpg'                              },
  { title: 'Panga',                     year: '2020', category: 'Bollywood',    src: '/projectsnew/Panga_film_poster.jpg'                   },
  { title: 'Raajneeti',                 year: '2010', category: 'Bollywood',    src: '/projectsnew/Raajneeti_poster.jpg'                    },
  { title: 'Gangaajal',                 year: '2003', category: 'Bollywood',    src: '/projectsnew/GANGAAJAL-1.jpeg'                        },
  { title: 'Jai Gangaajal',             year: '2016', category: 'Bollywood',    src: '/projectsnew/Jai_Gangaajal_poster.jpg'                },
  { title: 'Dabangg 3',                 year: '2019', category: 'Bollywood',    src: '/projectsnew/dabangg-3-poster.png'                    },
  { title: 'Manikarnika',               year: '2019', category: 'Bollywood',    src: '/projectsnew/Manikarnika_Poster.jpg'                  },
  { title: 'Padman',                    year: '2018', category: 'Bollywood',    src: '/projectsnew/padman.jpg'                              },
  { title: 'Laapataa Ladies',           year: '2024', category: 'Bollywood',    src: '/projectsnew/Laapataa_Ladies_poster.jpg'              },
  { title: 'Chakravyuh',                year: '2012', category: 'Bollywood',    src: '/projectsnew/Chakravyuh.jpg'                          },
  { title: 'Satyagraha',                year: '2013', category: 'Bollywood',    src: '/projectsnew/Satyagraha_poster.jpg'                   },
  { title: 'Mohenjo Daro',              year: '2016', category: 'Bollywood',    src: '/projectsnew/MOHANJO-DARO.jpeg'                       },
  { title: 'Asoka',                     year: '2001', category: 'Bollywood',    src: '/projectsnew/Asoka_(2001_film).jpg'                   },
  { title: 'Fraud Saiyaan',             year: '2019', category: 'Bollywood',    src: '/projectsnew/Fraud_Saiyyan_film_poster.jpg'           },
  { title: 'Narsimha',                  year: '2001', category: 'Bollywood',    src: '/projectsnew/Narsimha.jpg'                            },
  { title: 'Naya Daur',                 year: '1957', category: 'Bollywood',    src: '/projectsnew/Naya-Daur.jpg'                           },
  { title: 'Selfiee',                   year: '2023', category: 'Bollywood',    src: '/projectsnew/Selfiee_film.jpg'                        },
  { title: 'Kinara',                    year: '1977', category: 'Bollywood',    src: '/projectsnew/KINARA.jpg'                              },
  { title: 'Dirty Politics',            year: '2015', category: 'Bollywood',    src: '/projectsnew/Dirty_Politics_film_poster.jpg'          },
  { title: 'Gali Gali Chor Hai',        year: '2012', category: 'Bollywood',    src: '/projectsnew/Gali_Gali_Chor_Hai.jpg'                  },
  { title: 'Sayra',                     year: '2024', category: 'Bollywood',    src: '/projectsnew/Sayra.jpeg'                              },
  { title: 'Yamla Pagla Deewana',       year: '2011', category: 'Bollywood',    src: '/projectsnew/Yamla_Pagla_Deewana 1.jpg'               },
  { title: 'Yamla Pagla Deewana 2',     year: '2013', category: 'Bollywood',    src: '/projectsnew/Yamla_Pagla_Deewana_2.jpg'               },
  { title: 'Pyaar Ka Punchnama 2',      year: '2015', category: 'Bollywood',    src: '/projectsnew/Pyar Ka Punchnama 2.jpg'                 },
  { title: 'Dilbar',                    year: '1994', category: 'Bollywood',    src: '/projectsnew/Dilbar_1995.jpg'                         },
  { title: 'Dacait',                    year: '1987', category: 'Bollywood',    src: '/projectsnew/Dacait.jpg'                              },
  { title: 'Border 2',                  year: '2025', category: 'Bollywood',    src: '/projectsnew/Border_2_Poster.jpg'                     },
  { title: 'Mujhe Jeene Do',            year: '1963', category: 'Bollywood',    src: '/projectsnew/Mujhe_Jeene_Do,_1963_Hindi_film.jpg'     },
  { title: 'Aarakshan',                 year: '2011', category: 'Bollywood',    src: '/projectsnew/Aarakshan.jpg'                           },
  { title: 'Stree',                     year: '2018', category: 'Bollywood',    src: '/projectsnew/STREE 1.jpeg'                            },
  { title: 'Stree 2',                   year: '2024', category: 'Bollywood',    src: '/projectsnew/STREE 2.jpeg'                            },
  { title: 'Sui Dhaaga',                year: '2018', category: 'Bollywood',    src: '/projectsnew/SUI DHAGA.jpeg'                          },
  { title: 'Tevar',                     year: '2015', category: 'Bollywood',    src: '/projectsnew/Tevar.jpeg'                              },
  { title: 'Toilet Ek Prem Katha',      year: '2017', category: 'Bollywood',    src: '/projectsnew/Toilet_Ek_Prem_Katha.jpg'                },
  { title: 'Wah Taj',                   year: '2016', category: 'Bollywood',    src: '/projectsnew/Wah_Taj_(film).jpg'                      },
  { title: 'Welcome to Karachi',        year: '2015', category: 'Bollywood',    src: '/projectsnew/Welcome to Karachi.jpeg'                 },
  { title: 'Yaara',                     year: '2020', category: 'Bollywood',    src: '/projectsnew/Yaara_film_poster.jpg'                   },
  { title: 'Revolver Rani',             year: '2014', category: 'Bollywood',    src: '/projectsnew/Revolver_Rani_First_Look_Poster.jpg'     },
  { title: 'Singh Saab The Great',      year: '2013', category: 'Bollywood',    src: '/projectsnew/Singh Saab The Great.jpg'                },
  { title: 'Sherni',                    year: '2021', category: 'Bollywood',    src: '/projectsnew/Sherni_2021_poster.jpg'                  },
  { title: 'Ludo',                      year: '2020', category: 'Bollywood',    src: '/projectsnew/Ludo.jpeg'                               },
  { title: 'Peepli Live',               year: '2010', category: 'Bollywood',    src: '/projectsnew/Peeplilive.jpg'                          },
  { title: 'Paan Singh Tomar',          year: '2012', category: 'Bollywood',    src: '/projectsnew/Paan_Singh_Tomar_Poster.jpg'             },
  { title: 'Lipstick Under My Burkha',  year: '2017', category: 'Bollywood',    src: '/projectsnew/Lipstick_Under_My_Burkha_(2017).jpg'     },
  { title: 'Pran Jaye Par Vachan Na Jaye', year: '1974', category: 'Bollywood', src: '/projectsnew/Pran_Jaye_Par_Vachan_Na_Jaye.jpg'        },
  { title: 'Dil Diya Dard Liya',        year: '1966', category: 'Bollywood',    src: '/projectsnew/Dil_Diya_Dard_Liya_1966_film_poster.jpg' },
  { title: 'Soorma Bhopaali',           year: '1988', category: 'Bollywood',    src: '/projectsnew/soorma-bhopali-poster.jpg'               },
  { title: 'Teesr Kasam',               year: '1966', category: 'Bollywood',    src: '/projectsnew/Teesr Kasam.jpeg'                        },
  { title: 'Pyar Kiya To Darna Kya',    year: '1998', category: 'Bollywood',    src: '/projectsnew/Pyar-Kiya-To-Darna-Kya-306x393.jpg'      },
  { title: 'Bhopal Express',            year: '2000', category: 'Bollywood',    src: '/projectsnew/Bhopal Express.jpg'                      },
  { title: 'Bhopal: A Prayer for Rain', year: '2014', category: 'Bollywood',    src: '/projectsnew/Bhopal_a_prayer_for_rain_poster.jpg'     },
  { title: 'Matrubhoomi',               year: '2003', category: 'Bollywood',    src: '/projectsnew/Matrubhoomi_poster.jpg'                  },
  { title: 'Massey Sahib',              year: '1985', category: 'Bollywood',    src: '/projectsnew/Massey_Sahib_DVD_cover.jpg'              },
  { title: 'In Custody',                year: '1994', category: 'Bollywood',    src: '/projectsnew/In_Custody.jpg'                          },
  { title: 'Diary of a Butterfly',      year: '2012', category: 'Bollywood',    src: '/projectsnew/Diary_of_a_Butterfly_(2012_film)_poster.jpg' },
  { title: 'Lion',                      year: '2016', category: 'Hollywood',    src: '/projectsnew/Lion_(2016_film).png'                    },
  { title: 'Gautamiputra Satakarni',    year: '2017', category: 'Tollywood',    src: '/projectsnew/Gautamiputra_Satakarni_(film).jpg'       },
  { title: 'Aarambham',                 year: '2024', category: 'Tollywood',    src: '/projectsnew/Aarambham_(2024_film).jpg'               },
  { title: 'Leelai',                    year: '2012', category: 'Tollywood',    src: '/projectsnew/Leelai_poster.jpg'                       },
  { title: 'Thamizhan',                 year: '2002', category: 'Tollywood',    src: '/projectsnew/Thamizhan.jpg'                           },
  { title: 'Ponniyin Selvan 1',         year: '2022', category: 'Tollywood',    src: '/projectsnew/PS 1.jpeg'                               },
  { title: 'Gullak',                    year: '2019', category: 'Web Series',   src: '/projectsnew/Gullak Webseries.jpeg'                   },
  { title: 'Panchayat',                 year: '2020', category: 'Web Series',   src: '/projectsnew/Panchayat WebSeries.jpeg'                },
  { title: 'Lipstick Waale Sapne',      year: '2018', category: 'Web Series',   src: '/projectsnew/LIPSTICK WAALE SAPNE.jpeg'               },
  { title: 'Round Figure',              year: '2023', category: 'Web Series',   src: '/projectsnew/ROUND FIGURE.jpeg'                       },
  { title: 'Parikrama',                 year: '2022', category: 'Web Series',   src: '/projectsnew/PARIKRAMA.jpeg'                          },
  { title: 'Pinch',                     year: '2019', category: 'Web Series',   src: '/projectsnew/PINCH.jpeg'                              },
  { title: 'Single',                    year: '2015', category: 'Web Series',   src: '/projectsnew/SINGLE.jpeg'                             },
]

const CATEGORIES = ['All', 'Bollywood', 'Hollywood', 'Tollywood', 'Web Series']

const CAT_COLORS: Record<string, string> = {
  Bollywood:   '#C9A84C',
  Hollywood:   '#E8C97A',
  Tollywood:   '#7EC87E',
  'Web Series': '#E87C7C',
}

const stats = [
  { number: '50+',  label: 'Films Shot'        },
  { number: '₹2Cr', label: 'Max Subsidy'        },
  { number: '100+', label: 'Locations'          },
  { number: '15+',  label: 'Years Experience'   },
]


/* ─── Main Section — Split layout ──────────────────── */
export function MPProjectSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? films
    : films.filter(f => f.category === activeCategory)

  const goldGrad = {
    background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  }

  return (
    <section className="relative w-screen md:h-screen bg-[#080808] flex flex-col md:flex-row overflow-hidden">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── LEFT: Info panel ── */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-6 md:py-0 md:px-14 lg:px-16 w-full md:w-[38%] md:shrink-0 overflow-hidden">

        {/* Ghost watermark */}
        <motion.span
          className="absolute -bottom-4 -left-4 font-display font-bold select-none pointer-events-none leading-none hidden md:block"
          style={{ fontSize: 'clamp(80px,12vw,160px)', color: 'rgba(201,168,76,0.04)', whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          FILMS
        </motion.span>

        {/* Vertical gold film-strip line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

<div className="flex items-center gap-3 mb-2 md:mb-5">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <span className="text-[#C9A84C] text-sm">✦</span>
        </div>

        {/* Word-by-word heading reveal */}
        <h2 className="font-display font-bold text-[#F5F0E8] text-2xl md:text-4xl lg:text-5xl leading-tight mb-2 md:mb-4">
          {['Madhya', 'Pradesh'].map((word, i) => (
            <motion.span key={word} className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}>
              {word}
            </motion.span>
          ))}
          <br />
          {['Journey'].map((word, i) => (
            <motion.span key={word} className="inline-block mr-[0.25em]"
              style={goldGrad}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}>
              {word}
            </motion.span>
          ))}
        </h2>

        {/* ── Category filters ── */}
        <motion.div
          className="hidden md:flex flex-col gap-1.5 mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-left transition-all duration-300 group py-1 md:py-1.5"
            >
              <span
                className="h-px transition-all duration-300"
                style={{
                  width: activeCategory === cat ? 20 : 8,
                  background: activeCategory === cat ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                }}
              />
              <span style={{ color: activeCategory === cat ? '#C9A84C' : 'rgba(245,240,232,0.3)' }}>
                {cat}
              </span>
              {activeCategory === cat && (
                <span className="text-[#C9A84C] text-[10px]">
                  ({filtered.length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          className="mt-2 md:mt-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        >
          <Link
            href="/films"
            className="inline-flex items-center gap-3 text-[#C9A84C] text-xs tracking-[0.3em] uppercase group hover:gap-5 transition-all duration-300"
          >
            View All Projects
            <span className="h-px w-6 bg-[#C9A84C] group-hover:w-10 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* ── RIGHT: 3-row auto-scrolling grid ── */}
      <motion.div
        className="flex-1 flex flex-col justify-center gap-2 md:gap-3 overflow-hidden relative py-4 md:py-6 h-[560px] md:h-auto"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >

        {(() => {
          const r1 = films.slice(0, 16)
          const r2 = films.slice(16, 32)
          const r3 = films.slice(32)
          return [
            { films: [...r1, ...r1], dir: 1,  speed: 35 },
            { films: [...r2, ...r2], dir: -1, speed: 28 },
            { films: [...r3, ...r3], dir: 1,  speed: 40 },
          ]
        })().map((row, rowIdx) => (
          <div key={rowIdx} className="overflow-hidden">
            <motion.div
              className="flex gap-3 shrink-0 will-change-transform"
              animate={{ x: row.dir === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
              transition={{ duration: row.speed, repeat: Infinity, ease: 'linear' }}
            >
              {row.films.map((film, i) => (
                <motion.div
                  key={i}
                  className="group relative shrink-0 cursor-pointer overflow-hidden"
                  style={{
                    width: 'clamp(100px, 30vw, 190px)',
                    height: 'clamp(150px, 45vw, 285px)',
                    border: '1px solid rgba(201,168,76,0.12)',
                  }}
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                >
                  <img
                    src={film.src}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                  {/* Category badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[7px] tracking-[0.2em] uppercase font-semibold px-2 py-1"
                      style={{
                        color: CAT_COLORS[film.category] ?? '#C9A84C',
                        background: 'rgba(0,0,0,0.72)',
                        border: `1px solid ${CAT_COLORS[film.category] ?? '#C9A84C'}40`,
                      }}>
                      {film.category}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="h-px mb-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                      style={{ background: CAT_COLORS[film.category] ?? '#C9A84C' }} />
                    <p className="text-white font-display font-bold text-sm">{film.title}</p>
                  </div>
                  {/* Gold top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />

    </section>
  )
}
