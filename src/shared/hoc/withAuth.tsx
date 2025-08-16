/**
 * Authentication HOC
 * Provides authentication and authorization for components
 */
import React, { ComponentType, useEffect, useState } from 'react';

import { motion } from 'framer-motion';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
}

interface WithAuthOptions {
  requiredRole?: User['role'];
  requiredPermissions?: string[];
  fallback?: ComponentType;
  redirectTo?: string;
  loadingComponent?: ComponentType;
}

const DefaultLoadingComponent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-[400px]"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-muted">Authenticating...</p>
    </div>
  </motion.div>
);

const DefaultUnauthorizedComponent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-center min-h-[400px]"
  >
    <div className="neu-pressed p-8 rounded-2xl text-center max-w-md">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-bold text-primary mb-2">Access Denied</h2>
      <p className="text-muted">You don&apos;t have permission to view this content.</p>
    </div>
  </motion.div>
);

// Mock auth service - replace with actual implementation
const authService = {
  async checkAuth(): Promise<AuthState> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            permissions: ['read', 'write', 'delete'],
          },
          loading: false,
          error: null,
        });
      }, 500);
    });
  },

  hasRole(user: User | null, requiredRole: User['role']): boolean {
    if (!user) return false;
    const roleHierarchy = { guest: 0, user: 1, admin: 2 };
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  },

  hasPermissions(user: User | null, requiredPermissions: string[]): boolean {
    if (!user) return false;
    return requiredPermissions.every((permission) => user.permissions.includes(permission));
  },
};

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
): ComponentType<P> {
  const {
    requiredRole,
    requiredPermissions = [],
    fallback: FallbackComponent = DefaultUnauthorizedComponent,
    redirectTo,
    loadingComponent: LoadingComponent = DefaultLoadingComponent,
  } = options;

  const AuthWrappedComponent = (props: P) => {
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      user: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const state = await authService.checkAuth();
          setAuthState(state);

          // Handle redirect if not authenticated
          if (!state.isAuthenticated && redirectTo) {
            window.location.href = redirectTo;
          }
        } catch (error) {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Authentication failed'),
          });
        }
      };

      checkAuthentication();
    }, []);

    // Show loading state
    if (authState.loading) {
      return <LoadingComponent />;
    }

    // Show error state
    if (authState.error) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="neu-pressed p-8 rounded-2xl text-center max-w-md">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Authentication Error</h2>
            <p className="text-muted">{authState.error.message}</p>
          </div>
        </motion.div>
      );
    }

    // Check authentication
    if (!authState.isAuthenticated) {
      return <FallbackComponent />;
    }

    // Check role authorization
    if (requiredRole && !authService.hasRole(authState.user, requiredRole)) {
      return <FallbackComponent />;
    }

    // Check permissions
    if (
      requiredPermissions.length > 0 &&
      !authService.hasPermissions(authState.user, requiredPermissions)
    ) {
      return <FallbackComponent />;
    }

    // Render component with auth props
    return <Component {...props} user={authState.user} />;
  };

  AuthWrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthWrappedComponent;
}
