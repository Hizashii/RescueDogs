<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await api.post('/auth/login', { username: username.value, password: password.value });
    localStorage.setItem('jwt', response.data.token);
    router.push({ name: 'Dashboard' });
  } catch (err) {
    alert('Invalid credentials');
  }
};
</script>
