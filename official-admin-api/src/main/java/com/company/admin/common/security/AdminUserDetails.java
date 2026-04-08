package com.company.admin.common.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class AdminUserDetails implements UserDetails {
    private final Long id;
    private final String username;
    private final String displayName;
    private final String password;
    private final boolean enabled;
    private final List<GrantedAuthority> authorities;

    public AdminUserDetails(Long id, String username, String displayName, String password, boolean enabled, List<String> permissions) {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.enabled = enabled;
        this.authorities = permissions.stream().map(SimpleGrantedAuthority::new).map(a -> (GrantedAuthority) a).toList();
    }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    @Override public String getPassword() { return password; }
    @Override public String getUsername() { return username; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return enabled; }
}
