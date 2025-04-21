"use client"

import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const ConnectWalletCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Компонент готов к отображению?
        const ready = mounted && authenticationStatus !== 'loading'
        // Пользователь подключён?
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        // Пока не готов, показываем заглушку
        if (!ready) {
          return (
            <div className="btn-sm bg-gray-300 text-gray-500 animate-pulse">
              Connecting…
            </div>
          )
        }

        // Если не подключён — кнопка подключения
        if (!connected) {
          return (
            <button
              className="btn-sm bg-blue-600 text-white hover:bg-blue-500"
              onClick={openConnectModal}
              type="button"
            >
              Connect Wallet
            </button>
          )
        }

        // Неподдерживаемая сеть
        if (chain.unsupported) {
          return (
            <button
              className="btn-sm bg-red-500 text-white hover:bg-red-400"
              onClick={openChainModal}
              type="button"
            >
              Wrong Network
            </button>
          )
        }

        // Основное состояние: показываем сеть и аккаунт
        return (
          <div className="flex items-center gap-2">
            <button
              className="btn-sm flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={openChainModal}
              type="button"
            >
              {chain.hasIcon && (
                <div
                  style={{
                    background: chain.iconBackground,
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    overflow: 'hidden',
                    marginRight: 4,
                  }}
                >
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ width: 12, height: 12 }}
                    />
                  )}
                </div>
              )}
              {chain.name}
            </button>
            <button
              className="btn-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={openAccountModal}
              type="button"
            >
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletCustom