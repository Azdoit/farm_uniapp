export const useUser = defineStore(
    'user',
    () => {
      let isLogin = ref(false);
      const changeLoginState = () => {
        isLogin.value = !isLogin.value
      }
      watch(isLogin,() => {
        console.log('isLogin改变成了',isLogin.value);
        
      })
      return ({
        isLogin,
        changeLoginState
      });
    },
    {
      persist: true,
    }
  );