import { ref, computed } from 'vue';
import { useRuntimeConfig } from '#app';

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

interface CharityItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  category: string;
  stock: number;
  priceFt: number;
}

interface PaymentResult {
  success: boolean;
  message: string;
  sessionUrl?: string;
}

export default function useDogApi() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase || 'https://rescuedogs-1.onrender.com';
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const handleApiError = (error: any, context: string): string => {
    console.error(`${context}:`, error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'Network error. Please check your connection.';
    }
    
    if (error.response) {
      return `Server error: ${error.response.status}`;
    }
    
    return error.message || `Unknown error in ${context}`;
  };

  const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  };

  const fetchDogs = async (
    filters: DogFilters = {}, 
    page: number = 1, 
    limit: number = 12
  ): Promise<PaginatedResponse> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'Any') {
          if (key === 'size' || key === 'age' || key === 'gender' || key === 'goodWith') {
            params.append(key, value.toLowerCase());
          } else {
            params.append(key, value);
          }
        }
      });
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiRequest(`${baseUrl}/api/dogs?${params.toString()}`);
      const data = await response.json();
      
      return {
        dogs: data.dogs.map((dog: any) => ({
          id: dog._id,
          name: dog.name,
          breed: dog.breed || 'Unknown',
          image: dog.image?.startsWith('/uploads') 
            ? `${config.public.apiBase}${dog.image}` 
            : dog.image,
          description: dog.description,
          location: dog.location,
          size: dog.size,
          age: dog.age,
          gender: dog.gender,
          goodWith: Array.isArray(dog.goodWith) ? dog.goodWith : [],
          status: dog.status,
          cameIn: dog.cameIn,
          wentOut: dog.wentOut,
          lookingForOwner: dog.lookingForOwner,
          adapted: dog.adapted,
          furLength: dog.furLength,
          vaccination: dog.vaccination,
          relationToPeople: dog.relationToPeople,
          moreInfo: dog.moreInfo,
        })),
        total: data.total || 0,
        totalPages: data.totalPages || 1
      };
    } catch (err) {
      const errorMessage = handleApiError(err, 'fetchDogs');
      error.value = errorMessage;
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
    if (!id) {
      error.value = 'Dog ID is required';
      return null;
    }

    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiRequest(`${baseUrl}/api/dogs/${id}`);
      const dog = await response.json();
      
      if (dog.image?.startsWith('/uploads')) {
        dog.image = `${config.public.apiBase}${dog.image}`;
      }

      return {
        id: dog._id,
        name: dog.name,
        breed: dog.breed || 'Unknown',
        image: dog.image,
        description: dog.description,
        location: dog.location,
        size: dog.size,
        age: dog.age,
        gender: dog.gender,
        goodWith: Array.isArray(dog.goodWith) ? dog.goodWith : [],
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
      const errorMessage = handleApiError(err, `fetchDogById(${id})`);
      error.value = errorMessage;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchFilterOptions = async (): Promise<FilterOptions> => {
    try {
      const response = await apiRequest(`${baseUrl}/dogs/filters`);
      const options = await response.json();

      return {
        breeds: Array.isArray(options.breeds) ? options.breeds : [],
        locations: Array.isArray(options.locations) ? options.locations : [],
        statuses: Array.isArray(options.statuses) ? options.statuses : [],
        sizes: Array.isArray(options.sizes) ? options.sizes : [],
        ages: Array.isArray(options.ages) ? options.ages : [],
        genders: Array.isArray(options.genders) ? options.genders : [],
        furLengths: Array.isArray(options.furLengths) ? options.furLengths : [],
        vaccinationOptions: Array.isArray(options.vaccinationOptions) ? options.vaccinationOptions : [],
        goodWith: Array.isArray(options.goodWith) ? options.goodWith : []
      };
    } catch (err) {
      console.error('Error fetching filter options:', err);
      return {
        breeds: [],
        locations: [
          'Báránd', 'Bihardancsháza', 'Biharnagybajom', 'Hosszúhát', 'Komádi',
          'Körösszakál', 'Körösszegapáti', 'Magyarhomorog', 'Mezőpeterd',
          'Mezősas', 'Nádudvar', 'Nagyrábé', 'Püspökladány', 'Sáp',
          'Sárrétudvari', 'Szerep', 'Tetétlen', 'Zsáka'
        ],
        statuses: ['Up for adoption', 'Adopted'],
        sizes: ['Small', 'Medium', 'Large'],
        ages: ['Puppy', 'Young', 'Adult', 'Senior'],
        genders: ['Male', 'Female'],
        furLengths: ['Short', 'Medium', 'Long'],
        vaccinationOptions: ['Done', 'In progress', 'None'],
        goodWith: ['Children', 'Dogs', 'Cats']
      };
    }
  };

  const fetchCharityItems = async (): Promise<CharityItem[]> => {
    try {
      const response = await apiRequest('https://rescuedogs-1.onrender.com/api/CharityItems');
      const items = await response.json();

      if (!Array.isArray(items)) {
        throw new Error('Invalid response format: expected array of items');
      }

      return items
        .filter((item: any) => item.isActive && item.stock > 0)
        .map((item: any) => ({
          _id: item._id,
          name: item.name || 'Unnamed Item',
          price: typeof item.price === 'number' ? item.price : 0,
          description: item.description || '',
          imageUrl: item.imageUrl?.startsWith('/uploads')
            ? `https://rescuedogs-1.onrender.com${item.imageUrl}`
            : item.imageUrl || '',
          isActive: Boolean(item.isActive),
          category: item.category || 'General',
          stock: typeof item.stock === 'number' ? item.stock : 0,
          priceFt: typeof item.price === 'number' ? item.price : 0,
        }));
    } catch (err) {
      console.error('Error fetching charity items:', err);
      throw new Error(handleApiError(err, 'fetchCharityItems'));
    }
  };

  const processItemPurchase = async (itemId: string): Promise<PaymentResult> => {
    if (!itemId || typeof itemId !== 'string') {
      return {
        success: false,
        message: 'Invalid item ID provided'
      };
    }

    try {
      const response = await apiRequest(`${baseUrl}/api/payments/create-item-session`, {
        method: 'POST',
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();

      if (!data.sessionUrl) {
        throw new Error('No session URL received from server');
      }

      return {
        success: true,
        message: 'Redirecting to payment...',
        sessionUrl: data.sessionUrl
      };
    } catch (err) {
      const errorMessage = handleApiError(err, 'processItemPurchase');
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const processDonation = async (amount: number): Promise<PaymentResult> => {
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        success: false,
        message: 'Invalid donation amount. Must be a positive number.'
      };
    }

    try {
      const response = await apiRequest(`${baseUrl}/api/payments/create-donation-session`, {
        method: 'POST',
        body: JSON.stringify({ amountFt: Math.round(amount) }),
      });

      const data = await response.json();

      if (!data.sessionUrl) {
        throw new Error('No session URL received from server');
      }

      return {
        success: true,
        message: 'Redirecting to payment...',
        sessionUrl: data.sessionUrl
      };
    } catch (err) {
      const errorMessage = handleApiError(err, 'processDonation');
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  return {
    fetchDogs,
    fetchDogById,
    fetchFilterOptions,
    fetchCharityItems,
    processItemPurchase,
    processDonation,

    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value)
  };
}