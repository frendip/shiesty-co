'use client';

import React from 'react';
import {useForm, Controller, FieldError, UseFormRegisterReturn} from 'react-hook-form';
import {CommonButton, SelectorButton} from '@/components/ui/buttons';

interface FormData {
	size: 'M' | 'L';
	fullName: string;
	cdekAddress: string;
	phoneNumber: string;
}

interface PurchaseFormProps {
	onSubmit: (data: FormData) => void;
}

function PurchaseForm({onSubmit}: PurchaseFormProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<FormData>({
		defaultValues: {
			size: 'M'
		},
		mode: 'onSubmit'
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-3">Размер:</label>
				<Controller
					name="size"
					control={control}
					render={({field}) => (
						<div className="flex gap-3">
							<SelectorButton isActive={field.value === 'M'} onClick={() => field.onChange('M')}>
								M
							</SelectorButton>
							<SelectorButton isActive={field.value === 'L'} onClick={() => field.onChange('L')}>
								L
							</SelectorButton>
						</div>
					)}
				/>
			</div>

			<PurchaseFormInput
				label="ФИО"
				placeholder="Введите ваше полное имя"
				error={errors.fullName}
				register={register('fullName', {
					required: 'ФИО обязательно для заполнения',
					minLength: {
						value: 2,
						message: 'ФИО должно содержать минимум 2 символа'
					}
				})}
			/>

			<PurchaseFormInput
				label="Адрес пункта выдачи CDEK"
				placeholder="Например: г. Москва, ул. Ленина, д. 1"
				error={errors.cdekAddress}
				register={register('cdekAddress', {
					required: 'Адрес пункта выдачи обязателен',
					minLength: {
						value: 10,
						message: 'Укажите полный адрес пункта выдачи'
					}
				})}
			/>

			<PurchaseFormInput
				label="Номер телефона"
				placeholder="+7 (999) 123-45-67"
				error={errors.phoneNumber}
				register={register('phoneNumber', {
					required: 'Номер телефона обязателен',
					pattern: {
						value: /^[+]?[0-9\s\-\(\)]{10,}$/,
						message: 'Введите корректный номер телефона'
					}
				})}
			/>

			<div className="pt-4">
				<CommonButton isStretched>Связаться</CommonButton>
			</div>
		</form>
	);
}

interface PurchaseFormInputProps {
	label: string;
	placeholder: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
}

function PurchaseFormInput({label, placeholder, error, register}: PurchaseFormInputProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">{label}:</label>
			<input
				{...register}
				placeholder={placeholder}
				className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition-colors duration-200 placeholder-gray-400 focus:outline-none ${
					error
						? 'border-red-500 focus:border-red-600 bg-red-50'
						: 'border-black focus:border-gray-600 bg-white hover:border-gray-600'
				}`}
			/>
			{error && <p className="mt-2 text-sm text-red-600 font-medium">{error.message}</p>}
		</div>
	);
}

export default PurchaseForm;
