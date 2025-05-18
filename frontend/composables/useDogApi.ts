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
}
interface FilterOptions {
  breeds: string[];
  locations: string[];
  sizes: string[];
  ages: string[];
  genders: string[];
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
  const baseUrl = 'http://localhost:5000/api';  // Hard-coded for now
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
      
      const dogs = await response.json();
      const total = Math.max(dogs.length, 100); // Placeholder until proper pagination is implemented
      
      return {
        dogs: dogs.map((dog: any) => ({
          id: dog._id,
          name: dog.name,
          breed: dog.breed || 'Unknown',
          image: dog.image.startsWith('/uploads') 
            ? `http://localhost:5000${dog.image}` 
            : dog.image,
          description: dog.description,
          location: dog.location,
          size: dog.size,
          age: dog.age, 
          gender: dog.gender,
          goodWith: dog.goodWith || []
        })),
        total: total,
        totalPages: Math.ceil(total / limit)
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
          ? `http://localhost:5000${dog.image}` 
          : dog.image,
        description: dog.description,
        location: dog.location,
        size: dog.size,
        age: dog.age, 
        gender: dog.gender,
        goodWith: dog.goodWith || []
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
    return {
      breeds: [],
      locations: [
        'Báránd',
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
        'Zsáka'
      ],
      sizes: ['Small', 'Medium', 'Large'],
      ages: ['Puppy', 'Young', 'Adult', 'Senior'],
      genders: ['Male', 'Female'],
      goodWith: ['Children', 'Dogs', 'Cats']
    };
  };
  const processDonation = async (amount: number): Promise<{success: boolean, message: string}> => {
    console.log(`Processing donation of ${amount} Ft`);
    return {
      success: true,
      message: `Donation of ${amount} Ft processed successfully`
    };
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