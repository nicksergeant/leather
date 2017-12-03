defmodule LeatherWeb do
  @moduledoc "The entrypoint for defining your web interface, such\nas controllers, views, channels and so on.\n\nThis can be used in your application as:\n\n    use LeatherWeb, :controller\n    use LeatherWeb, :view\n\nThe definitions below will be executed for every view,\ncontroller, etc, so keep them short and clean, focused\non imports, uses and aliases.\n\nDo NOT define functions inside the quoted expressions\nbelow. Instead, define any helper function in modules\nand import those modules here.\n"

  def controller do
    quote do
      use Phoenix.Controller, namespace: LeatherWeb

      import Plug.Conn
      import LeatherWeb.Router.Helpers
      import LeatherWeb.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/leather_web/templates", namespace: LeatherWeb

      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      use Phoenix.HTML

      import LeatherWeb.Router.Helpers
      import LeatherWeb.ErrorHelpers
      import LeatherWeb.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router

      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      import LeatherWeb.Gettext
    end
  end

  @doc "When used, dispatch to the appropriate controller/view/etc.\n"
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
