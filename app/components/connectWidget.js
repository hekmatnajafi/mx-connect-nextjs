import { useEffect } from 'react';


export default function MXConnectWidget({ onEvent, widgetUrl }) {

  useEffect(() => {
    // Add the post message listener
    window.addEventListener('message', onPostMessage);

    return function cleanup() {
      // Make sure to remove the post message listener to avoid multiple messages
      window.removeEventListener('message', onPostMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


 
  const onPostMessage = event => {
    if (event.data && event.data.mx === true) {
      onEvent(event.data)
    }
  }


  return (
    <div className='border p-2 rounded-md'>
      <div className='flex-align flex-center mb-8'>
        <h1 as="ParagraphSmall" color="primary" tag="span">
          MXConnect Widget
        </h1>
      </div>
      <div>
        <iframe
          border='0'
          frame='0'
          frameBorder='0'
          height={650}
          marginHeight='0'
          marginWidth='0'
          src={widgetUrl}
          title='MX Connect Widget'
          width={766}
        />
      </div>
    </div>
  )
}