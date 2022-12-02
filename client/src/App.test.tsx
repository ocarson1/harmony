import { render, screen } from '@testing-library/react';
import App from './App';

// accessible aria label
let ariaLabel = 'The redlining properties of the clicked area'

beforeEach(() => {
  render(<App />)
})

/**
 * Testing that our webApp is accessible and aria labels are being read
 */
test('initial webpage has accessible info', async () => { 
  const info = await screen.findByLabelText(ariaLabel)
  expect(info).toBeInTheDocument()
});

/**
 * Integration testing of our backend and frontend, we can fetch the GeoJSON
 * data from the backend
 */
test('can fetch data from backend', async () => {
  const url = 'http://localhost:3600/redlining'
  const result = await fetch(url)
    .then(response => response.json())
    .then(data => data)

  expect(result['result']).toBe('success')
  expect(result['data']['type']).toBe('FeatureCollection')
  expect(result['data']['features'].length).toBe(8878)
})