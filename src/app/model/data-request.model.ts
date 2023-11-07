export interface DataRequest {
  user: string;
  pass: string;
  unit: string | null;
  start: string | null;
  end: string | null;
}

export function initialRequest(): DataRequest {
  return {
    user: '',
    pass: '',
    unit: null,
    start: null,
    end: null,
  }
}
