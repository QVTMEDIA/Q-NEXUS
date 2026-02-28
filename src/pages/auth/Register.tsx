import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@store/authStore'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const schema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
}).refine((d) => d.password === d.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

type FormData = z.infer<typeof schema>

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const { signUp, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    clearError()
    await signUp(data.email, data.password, data.full_name)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Create your account</h2>
        <p className="mt-1 text-sm text-white/50">Start your free Q-Nexus trial today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Full name</label>
          <input {...register('full_name')} type="text" className="input" placeholder="Amara Osei" />
          {errors.full_name && <p className="mt-1 text-xs text-red-400">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="label">Work email</label>
          <input {...register('email')} type="email" className="input" placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="input pr-10"
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <div>
          <label className="label">Confirm password</label>
          <input
            {...register('confirm_password')}
            type="password"
            className="input"
            placeholder="Repeat your password"
          />
          {errors.confirm_password && (
            <p className="mt-1 text-xs text-red-400">{errors.confirm_password.message}</p>
          )}
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating account…
            </span>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-brand-400 hover:text-brand-300 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
