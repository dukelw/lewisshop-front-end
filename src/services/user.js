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
