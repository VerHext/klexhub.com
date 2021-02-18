import axios from 'axios'
import React, { useState } from 'react'
import SunEditor from 'suneditor-react'
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
  const [data, setData] = useState<FormData>()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const onChangeInput = (key: string, value: string) => {
    console.log(key, value)
    setData({ ...data, [key]: value.toString() })
  }

  const onSubmit = () => {
    console.log(data)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setError({ error: false, message: '' })
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
    axios.post('/api/angebot', data).then(console.log).catch(console.error)

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
                value={data?.company_name}
                onChange={(e) => onChangeInput('company_name', e?.target?.value)}
                type="text"
                placeholder="StartUp GmbH"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label className="">E-Mail</label>
              <input
                value={data?.email}
                onChange={(e) => onChangeInput('email', e?.target?.value)}
                required
                type="email"
                placeholder="hello@startup.com"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label className="">Telefonnummer</label>
              <input
                value={data?.phone}
                onChange={(e) => onChangeInput('phone', e?.target?.value)}
                type="phone"
                placeholder="08225 7989000"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>

            <div className="formItem py-3">
              <label className="">Titel Ihres Projektes</label>
              <input
                value={data?.title_project}
                onChange={(e) => onChangeInput('title_project', e?.target?.value)}
                type="text"
                placeholder="App für unser Pizzalokal"
                className="px-3 py-3 border border-gray-300 bg-white text-sm outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div className="formItem py-3">
              <label id="budget">Budget</label>
              <select
                value={data?.budget}
                onChange={(e) => onChangeInput('budget', e?.target?.value)}
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

            <div className="border border-gray-300 bg-white ">
              <SunEditor
                defaultValue={data?.description_project}
                height="350"
                setDefaultStyle=" font-size: 15px;"
                placeholder="Beschreiben Sie Ihr Projekt..."
                onChange={(e) => onChangeInput('description_project', e)}
              />
            </div>
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
