import React, { Component, ErrorInfo, ReactNode } from 'react';
import { telemetry } from '../utils/telemetry.ts';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    telemetry.trackError(error, errorInfo.componentStack || undefined);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#171717] border border-red-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4 text-xl">
              ⚠️
            </div>
            <h2 className="text-xl font-bold mb-2">Ops! Algo inesperado aconteceu</h2>
            <p className="text-sm text-slate-400 mb-6">
              O monitor de observabilidade capturou este evento. Clique abaixo para reiniciar a interface sem perder suas preferências.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-[#FF6600] hover:bg-[#E65C00] text-white font-medium rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              Recarregar Arena Underground
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
