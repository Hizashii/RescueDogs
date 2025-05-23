import { ref, computed } from 'vue';

interface Dog {
  id: string;
  name: string;
  description: string;
  image: string;
  location?: string;
  breed?: string;
  size?: string;
  age?: string;
  gender?: string;
  goodWith?: string[];
  status?: string;
  cameIn?: string;
  wentOut?: string;
  lookingForOwner?: string;
  adapted?: string;
  furLength?: string;
  vaccination?: string;
  relationToPeople?: string;
  moreInfo?: string;
}
interface FilterOptions {
  breeds: string[];
  locations: string[];
  statuses: string[];
  sizes: string[];
  ages: string[];
  genders: string[];
  furLengths: string[];
  vaccinationOptions: string[];
  goodWith: string[];
}
interface DogFilters {
  name?: string;
  location?: string;
  breed?: string;
  size?: string;
  age?: string;
  gender?: string;
  goodWith?: string;
}
interface PaginatedResponse {
  dogs: Dog[];
  total: number;
  totalPages: number;
}
export default function useDogApi() {
  const config = useRuntimeConfig();
  const baseUrl = 'http://localhost:5000/api';  // Direct backend URL
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const fetchDogs = async (
    filters: DogFilters = {}, 
    page: number = 1, 
    limit: number = 12
  ): Promise<PaginatedResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append('name', filters.name);
      if (filters.location && filters.location !== 'Any') params.append('location', filters.location);
      if (filters.breed && filters.breed !== 'Any') params.append('breed', filters.breed);
      if (filters.size && filters.size !== 'Any') params.append('size', filters.size.toLowerCase());
      if (filters.age && filters.age !== 'Any') params.append('age', filters.age.toLowerCase());
      if (filters.gender && filters.gender !== 'Any') params.append('gender', filters.gender.toLowerCase());
      if (filters.goodWith && filters.goodWith !== 'Any') {
        params.append('goodWith', filters.goodWith.toLowerCase());
      }
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await fetch(`${baseUrl}/dogs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        dogs: data.dogs.map((dog: any) => ({
          id: dog._id,
          name: dog.name,
          breed: dog.breed || 'Unknown',
          image: dog.image.startsWith('/uploads') 
            ? `${baseUrl.replace('/api', '')}${dog.image}` 
            : dog.image,
          description: dog.description,
          location: dog.location,
          size: dog.size,
          age: dog.age, 
          gender: dog.gender,
          goodWith: dog.goodWith || []
        })),
        total: data.total,
        totalPages: data.totalPages
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching dogs';
      error.value = errorMessage;
      console.error('Error fetching dogs:', errorMessage);
      return {
        dogs: [],
        total: 0,
        totalPages: 1
      };
    } finally {
      isLoading.value = false;
    }
  };
  const fetchDogById = async (id: string): Promise<Dog | null> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${baseUrl}/dogs/${id}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const dog = await response.json();
      
      return {
        id: dog._id,
        name: dog.name,
        breed: dog.breed || 'Unknown',
        image: dog.image.startsWith('/uploads') 
          ? `${baseUrl.replace('/api', '')}${dog.image}` 
          : dog.image,
        description: dog.description,
        location: dog.location,
        size: dog.size,
        age: dog.age, 
        gender: dog.gender,
        goodWith: dog.goodWith || [],
        status: dog.status,
        cameIn: dog.cameIn,
        wentOut: dog.wentOut,
        lookingForOwner: dog.lookingForOwner,
        adapted: dog.adapted,
        furLength: dog.furLength,
        vaccination: dog.vaccination,
        relationToPeople: dog.relationToPeople,
        moreInfo: dog.moreInfo,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Error fetching dog with ID ${id}`;
      error.value = errorMessage;
      console.error(errorMessage);
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchFilterOptions = async (): Promise<FilterOptions> => {
    try {
      const response = await fetch(`${baseUrl}/dogs/filters`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const options = await response.json();
      
      return {
        breeds: options.breeds || [],
        locations: options.locations || [],
        statuses: options.statuses || [],
        sizes: options.sizes || [],
        ages: options.ages || [],
        genders: options.genders || [],
        furLengths: options.furLengths || [],
        vaccinationOptions: options.vaccinationOptions || [],
        goodWith: options.goodWith || []
      };
    } catch (err) {
      console.error('Error fetching filter options:', err);
      // Provide fallback options in case of API error
      return {
        breeds: [],
        locations: ['Báránd',
        'Bihardancsháza',
        'Biharnagybajom',
        'Hosszúhát',
        'Komádi',
        'Körösszakál',
        'Körösszegapáti',
        'Magyarhomorog',
        'Mezőpeterd',
        'Mezősas',
        'Nádudvar',
        'Nagyrábé',
        'Püspökladány',
        'Sáp',
        'Sárrétudvari',
        'Szerep',
        'Tetétlen',
        'Zsáka'],
        statuses: ['Up for adoption', 'Adopted'],
        sizes: ['Small', 'Medium', 'Large'],
        ages: ['Puppy', 'Young', 'Adult', 'Senior'],
        genders: ['Male', 'Female'],
        furLengths: ['Short', 'Medium', 'Long'],
        vaccinationOptions: ['Done', 'In progress', 'None'],
        goodWith: ['Children', 'Dogs', 'Cats']
      };
    } finally {
      isLoading.value = false; // Assuming isLoading is used for filter options as well, or you might need a separate loading state
    }
  };
  const processDonation = async (amount: number): Promise<{success: boolean, message: string}> => {
    try {
      const response = await fetch(`${baseUrl}/payments/create-donation-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amountFt: amount }),
      });

      if (!response.ok) {
        throw new Error(`Payment session creation failed: ${response.status}`);
      }

      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl; // Redirect to Stripe Checkout
      return { success: true, message: 'Redirecting to payment...' };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      console.error('Error processing donation:', errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  
  return {
    fetchDogs,
    fetchDogById,
    fetchFilterOptions,
    processDonation,
    isLoading,
    error
  };
}
