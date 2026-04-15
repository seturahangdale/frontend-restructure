'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const CAT_COLORS: Record<string, string> = {
  Bollywood:    '#C9A84C',
  Hollywood:    '#E8C97A',
  Tollywood:    '#7EC87E',
  'Web Series': '#E87C7C',
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

export default function FilmsPage() {
  const [selected, setSelected] = useState<typeof films[0] | null>(null)

  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-32">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* ── HEADER ── */}
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          <Link href="/"
            className="inline-flex items-center gap-2 text-[#C9A84C]/40 hover:text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase transition-colors mb-8 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[10px] tracking-[0.6em] text-[#C9A84C] uppercase font-medium mb-3">Our Portfolio</p>
              <h1 className="font-display font-bold text-[#F5F0E8] text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Films Shot in<br /><span style={goldText}>Madhya Pradesh</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-[#C9A84C] text-5xl">{films.length}</p>
              <p className="text-[9px] tracking-[0.4em] text-[#F5F0E8]/25 uppercase mt-1">Films & Series</p>
            </div>
          </div>

          <div className="mt-6 h-px"
            style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.4), transparent)' }} />
        </motion.div>

        {/* ── POSTER GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {films.map((film, i) => (
            <motion.div key={film.title}
              className="group relative cursor-pointer overflow-hidden"
              style={{ aspectRatio: '2/3', background: '#080808' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 12) * 0.04 }}
              onClick={() => setSelected(film)}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <img src={film.src} alt={film.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                draggable={false} />

              {/* Dark overlay — shows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              {/* Category badge — always visible */}
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[7px] tracking-[0.15em] uppercase font-bold px-1.5 py-0.5"
                  style={{
                    color: CAT_COLORS[film.category] ?? '#C9A84C',
                    background: 'rgba(0,0,0,0.72)',
                    border: `1px solid ${CAT_COLORS[film.category] ?? '#C9A84C'}30`,
                  }}>
                  {film.category}
                </span>
              </div>

              {/* Title — slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-display font-bold text-sm leading-snug">{film.title}</p>
                <p className="text-[#C9A84C]/70 text-[10px] mt-0.5">{film.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative flex flex-col items-center"
              style={{ maxHeight: '88vh', maxWidth: '340px', width: '100%' }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
              <div className="absolute -top-2 -right-2 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />
              <div className="absolute -bottom-8 -left-2 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
              <div className="absolute -bottom-8 -right-2 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />

              <img src={selected.src} alt={selected.title}
                className="w-full object-contain"
                style={{ maxHeight: '72vh' }} />

              <div className="mt-5 text-center">
                <p className="font-display font-bold text-[#F5F0E8] text-2xl">{selected.title}</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold px-2.5 py-1"
                    style={{
                      color: CAT_COLORS[selected.category] ?? '#C9A84C',
                      border: `1px solid ${CAT_COLORS[selected.category] ?? '#C9A84C'}40`,
                    }}>
                    {selected.category}
                  </span>
                  <span className="text-[#F5F0E8]/30 text-xs">{selected.year}</span>
                </div>
              </div>

              {/* Close */}
              <button
                className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8C97A] transition-colors"
                onClick={() => setSelected(null)}
              >
                <X className="w-4 h-4 text-[#080808]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
