import Popper from 'popper.js'
import React from 'react'

export const Tooltip = ({ color }) => {
  const [tooltipShow, setTooltipShow] = React.useState(false)
  const btnRef = React.createRef() as any
  const tooltipRef = React.createRef() as any
  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'top',
    })
    setTooltipShow(true)
  }
  const closeLeftTooltip = () => {
    setTooltipShow(false)
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className={
              'bg-' +
              color +
              '-500 text-white active:bg-' +
              color +
              '-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
            }
            type="button"
            style={{ transition: 'all .15s ease' }}
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
          >
            top {color}
          </button>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-' +
              color +
              '-600 border-0 mb-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}
          >
            <div>
              <div
                className={
                  'bg-' +
                  color +
                  '-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg'
                }
              >
                {color} tooltip title
              </div>
              <div className="text-white p-3">
                And here's some amazing content. It's very engaging. Right?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
