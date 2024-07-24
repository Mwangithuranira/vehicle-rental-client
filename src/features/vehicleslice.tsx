// vehicleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Adjust type as per your application

export interface Vehicle {
  id: string;
  rental_rate: number;
  availability: boolean;
  vehicleSpecification: {
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    transmission: string;
    price: string;
    seating_capacity: number;
    image: string;
    features: string;
    color: string;
    engine_capacity: string;
  };
  insurance: {
    policy_number: string;
    provider: string;
    coverage: string;
    start_date: string;
    end_date: string;
  };
  fleet: {
    acquisition_date: string;
    depreciation_rate: number;
    current_value: number;
    maintenance_cost: number;
    status: string;
  };
}

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
  },
});

export const { setLoading, setError, setVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;