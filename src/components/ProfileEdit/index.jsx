import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import InfoRow from '@arcblock/ux/lib/InfoRow';
import Button from '@arcblock/ux/lib/Button';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@arcblock/ux/lib/ErrorBoundary';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { api } from '../../api';
import { useSnackbar } from '../../hooks/useShowSuccessMsg';

import styles from './index.module.css';

const phoneUtil = PhoneNumberUtil.getInstance();

export const ProfileEdit = ({ userInfo, setMode, getInfo }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { showMsg, SnackbarComponent } = useSnackbar();

  const handleCancel = () => {
    setMode('show');
  };

  const formik = useFormik({
    initialValues: {
      userName: userInfo.userName ?? '',
      phone: userInfo.phone ?? '',
      mail: userInfo.mail ?? '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      userName: Yup.string().max(15, t('userNameValid')),
      phone: Yup.string().test('valid', t('phoneValid'), (value) => {
        try {
          const result = phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value));
          return result;
        } catch (error) {
          return false;
        }
      }),
      mail: Yup.string().email(t('mailValid')),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const [err] = await api.saveUserInfo({ did: window.blocklet.did, ...values });
      if (!err) {
        setIsLoading(false);
        showMsg('success');
        getInfo();
        setTimeout(() => {
          setMode('show');
        }, 1000);
      }
    },
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <form onSubmit={formik.handleSubmit}>
        <InfoRow nameWidth={80} name={t('userName')}>
          <TextField
            label="userName"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!formik.errors?.userName}
            helperText={formik.errors.userName}
            {...formik.getFieldProps('userName')}
          />
        </InfoRow>
        <InfoRow nameWidth={80} name={t('phone')} style={{ overflow: 'visible' }} className={styles.phone}>
          <TextField
            label="phone"
            color="primary"
            fullWidth
            error={!!formik.errors?.phone}
            helperText={formik.errors.phone}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <PhoneInput
                  defaultCountry="cn"
                  {...formik.getFieldProps('phone')}
                  onChange={(value) => {
                    formik.setFieldValue('phone', value);
                  }}
                />
              ),
            }}
          />
        </InfoRow>
        <InfoRow nameWidth={80} name={t('mail')}>
          <TextField
            label="mail"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!formik.errors?.mail}
            helperText={formik.errors.mail}
            {...formik.getFieldProps('mail')}
          />
        </InfoRow>

        <Button variant="contained" color="primary" type="submit" loading={isLoading}>
          {t('save')}
        </Button>
        <Button variant="contained" className={styles.cancelBtn} onClick={handleCancel}>
          {t('cancel')}
        </Button>
        <SnackbarComponent />
      </form>
    </ErrorBoundary>
  );
};
