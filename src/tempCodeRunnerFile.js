useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(loadUser());
    }
  }, [])