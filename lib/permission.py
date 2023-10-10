from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
    
        # check if the request is read only, if it's it's authorised
        if request.method in SAFE_METHODS:
            return True
        
        # if it's not will not have access
        return obj.user == request.user


# class HaveAccessImagePermission(BasePermission):
    
#     def has_object_permission(self, request, view, obj):
        
#         if request.method in SAFE_METHODS:
#             return True
        
#         return obj.reviews.filter(likes.count()>10)