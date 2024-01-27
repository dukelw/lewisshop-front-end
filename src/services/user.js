import * as httpRequest from '~/utils/httpRequest';

export const userSignin = async (email, password) => {
  try {
    const res = await httpRequest.post('shop/signin', {
      email,
      password,
    });
    
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getDraft = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get('product/draft/all', {
      params: {
        q,
        type,
      },
    });

    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
