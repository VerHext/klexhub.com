import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { validateEmail } from 'utils/validate'

export interface FormData {
  company_name: string
  email: string
  phone?: string
  title_project: string
  budget: string
  description_project: string
}

export default function Angebot() {
  const [error, setError] = useState<{ error: boolean; message: string }>()
  const [data, setData] = useState<FormData>({
    budget: '800',
    company_name: '',
    description_project: '',
    email: '',
    title_project: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    console.dir(data)
  }, [data])

  const onSubmit = () => {
    const d = data
    console.log(d)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (!validateEmail(data?.email)) {
      setError({
        error: true,
        message: 'Die E-Mail schaut aber irgendwie komisch aus. Überprüfen Sie diese bitte.',
      })
      return
    }
    if (data?.company_name == '') {
      setError({
        error: true,
        message: 'Bitte geben Sie Ihren Firmennamen an.',
      })
      return
    }
    if (data?.title_project == '') {
      setError({
        error: true,
        message: 'Bitte geben Sie einen Titel für Ihr Projekt an.',
      })
      return
    }
    if (data?.description_project == '') {
      setError({
        error: true,
        message: 'Bitte geben Sie eine Projektbeschreibung ein.',
      })
      return
    }

    //Send form to backend.
    axios.post('/api/angebot', d).then(console.log).catch(console.error)

    setError({
      error: false,
      message: 'Vielen Dank! Wir haben Ihr Angebot erhalten und melden uns schnellstmöglich.',
    })
    setSubmitted(true)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-12 pt-12 text-klexs-500">
        <h1 className="font-bold text-2xl text-klexs-500">Angebot</h1>
        <p className=" py-6">
          Hey, lassen Sie uns mehr über Ihr Projekt wissen. Um was geht es denn? Was benötigen Sie?
          <br />
          Damit wir Sie bei der Realisierung unterstützen können, geben Sie uns bitte einen groben
          Überblick über Ihr Vorhaben. <br />
          Natürlich können Sie uns auch direkt anrufen und im persönlichen Gespräch ihr Vorhaben
          vorstellen.
        </p>
        <p className={`${error?.error ? 'text-red-500' : 'text-green-800'}`}>{error?.message}</p>
        <div className="pb-32">
          <section className={submitted ? 'hidden' : ''}>
            <div className="formItem py-3">
              <label className="">Name Ihres Unternehmens</label>
              <input
                onChange={(e) => setData({ ...data, company_name: e?.target?.value })}
                type="text"
                placeholder="StartUp GmbH"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label className="">E-Mail</label>
              <input
                onChange={(e) => setData({ ...data, email: e?.target?.value })}
                required
                type="email"
                placeholder="hello@startup.com"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label className="">Telefonnummer</label>
              <input
                onChange={(e) => setData({ ...data, phone: e?.target?.value })}
                type="phone"
                placeholder="08225 7989000"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>

            <div className="formItem py-3">
              <label className="">Titel Ihres Projektes</label>
              <input
                onChange={(e) => setData({ ...data, title_project: e?.target?.value })}
                type="text"
                placeholder="App für unser Pizzalokal"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label id="budget">Budget</label>
              <select
                onChange={(e) => setData({ ...data, budget: e?.target?.value })}
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              >
                <option value="800">{'Kleines Projekt < 800€'}</option>
                <option value="1500">{'800€ - 1.500€'}</option>
                <option value="3000">{'1.500€ - 3.000€'}</option>
                <option value="6000">{'3.000€ - 6.000€'}</option>
                <option value="7000">{'6.000€ - 7.000€'}</option>
                <option value="10000">{'7.000€ - 10.000€'}</option>
                <option value="12000">{'10.000€ - 12.000€'}</option>
                <option value="over-12000">{'> 12.000€'}</option>
              </select>
            </div>
            <div className="formItem py-3"></div>
            <label>Projektbeschreibung</label>

            <textarea
              onChange={(e) => setData({ ...data, description_project: e?.target?.value })}
              placeholder="Beschreiben Sie Ihr Projekt..."
              cols={40}
              rows={5}
              className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
            />

            <div className="py-8">
              <button
                onClick={onSubmit}
                className="mt-5 mb-8 float-right rounded-sm text-white bg-klexp-500 px-4 py-2  hover:bg-klexp-600 focus:outline-none"
              >
                Angebot absenden!
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/**
 *  <Editor
                id="editor-angebot-001"
                apiKey="c96mccvud9k0kxo3w1d4ascqq2cojwfe0f68k7my1m1te5fc"
                init={{
                  menubar: 'view edit insert format table',
                  menu: {
                    view: { title: 'View', items: 'preview | print | fullscreen' },
                    edit: {
                      title: 'Edit',
                      items: 'undo redo | cut copy paste | selectall | searchreplace',
                    },

                    insert: {
                      title: 'Insert',
                      items:
                        'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
                    },
                    format: {
                      title: 'Format',
                      items:
                        'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat',
                    },

                    table: {
                      title: 'Table',
                      items: 'inserttable | cell row column | tableprops deletetable',
                    },
                  },
                  toolbar_mode: 'floating',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'KlexHub',
                  plugins:
                    'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                  toolbar:
                    'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                  height: 350,
                  placeholder: 'Beschreiben Sie Ihr Projekt...',
                }}
                onEditorChange={(e, d) => setData({ ...data, description_project: e })}
              />
 */
