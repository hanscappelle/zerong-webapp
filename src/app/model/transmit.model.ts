export interface Transmit {
  unitnumber: string;
  name: string;
  unittype: string;
  unitmodel: string;
  analog1: number;
  analog2: number;
  mileage: string;
  software_version: string;
  logic_state: string;
  reason: string;
  response: string;
  driver: string;
  longitude: number;
  latitude: number;
  altitude: string;
  gps_valid: string;
  gps_connected: string;
  satellites: string;
  velocity: string;
  heading: string;
  emergency: string;
  shock: string;
  ignition: string;
  door: string;
  hood: string;
  volume: string;
  water_temp: string;
  oil_pressure: string;
  main_voltage: number;
  fuel: string;
  analog3: number;
  siren: string;
  lock: string;
  int_lights: string;
  datetime_utc: string;
  datetime_actual: string;
  address: string;
  perimeter: string;
  color: number;
  soc: number;
  tipover: number;
  charging: number;
  chargecomplete: number;
  pluggedin: number;
  chargingtimeleft: number;
  storage: number;
  battery: number;
}
