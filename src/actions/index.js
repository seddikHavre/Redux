
const TEMPERATURE='TEMPERATURE'

export function addTemperature(title, actual){
  return {
    type: TEMPERATURE,
    title : title,
    actual: actual
  }
}

export const ON_OFF = 'ON_OFF'

export function addOnOff(title, actual){
  return {
    type: ON_OFF,
    title : title,
    actual: actual
  }
}

export const PERCENT = 'PERCENT'

export function addPercent(title, actual){
  return {
    type: PERCENT,
    title : title,
    actual: actual
  }
}

