class ReactBaseException(Exception):

    """base exception for react_render"""

    pass


class RenderServerError(Exception):

    """raised when server can not start"""

    pass


class ReactRenderingError(Exception):

    """raised when something error happen on react server render"""

    pass


class ComponentFileNotFound(Exception):

    """raised when can not find the source file"""

    pass
